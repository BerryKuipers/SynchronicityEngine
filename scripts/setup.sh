#!/usr/bin/env bash
set -euo pipefail

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# DRY error handling helper
fail_and_wait() {
    echo -e "\n${RED}✗ $1${NC}"
    read -p "Press Enter to close..."
    exit 1
}

# Create tmp directory and setup logging
mkdir -p tmp
LOG_FILE="tmp/startup.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "=== Setup started at $(date) ===" >> "$LOG_FILE"
echo -e "${GREEN}=== SynchronicityEngine Setup ===${NC}"
echo -e "${YELLOW}Logging to: $LOG_FILE${NC}\n"

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
if ! npm install; then
    fail_and_wait "Failed to install dependencies"
fi
echo -e "${GREEN}✓ Dependencies installed${NC}\n"

# Build all packages
echo -e "${YELLOW}Building all packages...${NC}"
if ! npm run build; then
    fail_and_wait "Build failed"
fi
echo -e "${GREEN}✓ Build successful${NC}\n"

# Start Docker services
echo -e "${YELLOW}Starting Docker services...${NC}"
if ! command -v docker &> /dev/null; then
    fail_and_wait "Docker not found. Please install Docker Desktop."
fi

if ! docker info &> /dev/null; then
    fail_and_wait "Docker is not running. Please start Docker Desktop."
fi

if ! docker compose up -d; then
    fail_and_wait "Failed to start Docker services"
fi

echo -e "${GREEN}✓ Docker services started${NC}"
echo -e "${YELLOW}Waiting for database to be ready...${NC}"

# Wait for database to be healthy
for i in {1..30}; do
    if docker compose exec -T postgres pg_isready -U synchronicity &> /dev/null; then
        echo -e "${GREEN}✓ Database is ready${NC}\n"
        break
    fi
    if [ $i -eq 30 ]; then
        fail_and_wait "Database failed to start"
    fi
    sleep 1
done

# Run database migrations
echo -e "${YELLOW}Running database migrations...${NC}"
if ! npm run migrate --workspace=@synchronicity/persistence; then
    fail_and_wait "Migrations failed"
fi
echo -e "${GREEN}✓ Migrations completed${NC}\n"

# Success - start dev servers automatically
echo -e "${GREEN}=== Setup Complete! ===${NC}\n"
echo -e "${YELLOW}Starting dev servers...${NC}"
echo -e "${YELLOW}Backend will run on http://localhost:3000${NC}"
echo -e "${YELLOW}Frontend will run on http://localhost:5173${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}\n"

# Start backend in background
(cd apps/backend && npm run dev) &
BACKEND_PID=$!

# Start frontend (this will keep terminal open)
(cd apps/frontend && npm run dev)

# If frontend exits, kill backend
kill $BACKEND_PID 2>/dev/null
