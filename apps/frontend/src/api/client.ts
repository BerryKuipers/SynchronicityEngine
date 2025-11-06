import type { EngineActionResult, EngineSnapshot } from '@synchronicity/engine';

const extractEnvApiUrl = (): string | undefined => {
  const value = import.meta.env.VITE_API_URL;
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }
  return undefined;
};

const API_URL = extractEnvApiUrl() ?? 'http://localhost:3001';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    const message = payload.error ?? `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  return (await response.json()) as T;
};

export const fetchSnapshot = async (sessionId: string): Promise<EngineSnapshot> => {
  const response = await fetch(`${API_URL}/api/v1/sessions/${sessionId}`);
  return handleResponse<EngineSnapshot>(response);
};

export const submitAction = async (sessionId: string, actionId: string): Promise<EngineActionResult> => {
  const response = await fetch(`${API_URL}/api/v1/sessions/${sessionId}/actions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ actionId }),
  });
  return handleResponse<EngineActionResult>(response);
};
