#!/usr/bin/env bash
set -euo pipefail

FRONTEND_PORT="${FRONTEND_PORT:-7080}"
BACKEND_PORT="${BACKEND_PORT:-7081}"
NO_OPEN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --frontend-port) FRONTEND_PORT="$2"; shift 2 ;;
    --backend-port) BACKEND_PORT="$2"; shift 2 ;;
    --no-open) NO_OPEN=1; shift ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

is_windows() {
  case "$(uname -s | tr '[:upper:]' '[:lower:]')" in
    msys*|mingw*|cygwin*) return 0 ;;
    *) return 1 ;;
  esac
}

kill_port_posix() {
  local port="$1"
  if command -v lsof >/dev/null 2>&1; then
    local pids
    pids=$(lsof -ti ":${port}" || true)
    [[ -n "${pids}" ]] && kill -9 ${pids} || true
  elif command -v ss >/dev/null 2>&1; then
    local pids
    pids=$(ss -lptnH "( sport = :${port} )" 2>/dev/null | sed -n 's/.*pid=\([0-9]\+\).*/\1/p' | sort -u)
    [[ -n "${pids}" ]] && kill -9 ${pids} || true
  fi
}

kill_port_windows() {
  local port="$1"
  local pids
  pids=$(netstat -ano | grep ":${port} " | awk '{print $5}' | sort -u | tr -d '\r')
  if [[ -n "${pids}" ]]; then
    while read -r pid; do
      [[ -n "${pid}" ]] && taskkill //PID "${pid}" //F >/dev/null 2>&1 || true
    done <<< "${pids}"
  fi
}

kill_port() {
  local port="$1"
  if is_windows; then kill_port_windows "${port}"; else kill_port_posix "${port}"; fi
}

echo "Ensuring ports free: FE:${FRONTEND_PORT} BE:${BACKEND_PORT}"
kill_port "${FRONTEND_PORT}"
kill_port "${BACKEND_PORT}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

BACKEND_CMD=(npm run -w apps/backend dev)
FRONTEND_CMD=(npm run -w apps/frontend dev)

if [[ "${NO_OPEN}" -eq 1 ]]; then
  FRONTEND_CMD+=('--' '--no-open')
fi

pids=()
cleanup() {
  echo "Shutting down…"
  for p in "${pids[@]:-}"; do
    kill "$p" 2>/dev/null || true
  done
  kill_port "${FRONTEND_PORT}"
  kill_port "${BACKEND_PORT}"
  exit 0
}
trap cleanup INT TERM

echo "Starting backend on :${BACKEND_PORT}"
( cd "${ROOT_DIR}" && BACKEND_PORT="${BACKEND_PORT}" "${BACKEND_CMD[@]}" ) &
pids+=($!)

sleep 1

echo "Starting frontend on :${FRONTEND_PORT}"
( cd "${ROOT_DIR}" && FRONTEND_PORT="${FRONTEND_PORT}" "${FRONTEND_CMD[@]}" ) &
pids+=($!)

echo "Dev stack running → FE http://localhost:${FRONTEND_PORT} | BE http://localhost:${BACKEND_PORT}"
wait
