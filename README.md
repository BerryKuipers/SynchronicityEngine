# SynchronicityEngine

A modular consciousness-simulation engine. Text-first now, visual later.

## Data Persistence
This repo uses a hexagonal architecture. The engine is storage-agnostic. The backend talks to a persistence adapter that records:
- append-only events
- periodic engine snapshots
- layer state snapshots
- beliefs and their history
- timeline nodes and edges

This project uses Postgres for data persistence. You will need to provide a Postgres database URL in a `.env` file for the application to connect to. See `.env.example` for the required format.

## Quick Start
1) `npm install`
2) Create a `.env` file and add your `DATABASE_URL`.
3) `npm run -w @synchronicity/persistence generate`
4) `npm run -w @synchronicity/persistence migrate`
5) `npm run -w @synchronicity/persistence seed`
6) `npm run dev`

## Development Stack
To run the backend and frontend development servers together, use the `dev:stack` script:

```bash
npm run dev:stack
```

This script handles finding and killing any processes that may be lingering on the required ports (`7080` for the frontend, `7081` for the backend) before starting the servers.

### Custom Ports
To use different ports, set the `FRONTEND_PORT` and `BACKEND_PORT` environment variables:

```bash
FRONTEND_PORT=3000 BACKEND_PORT=3001 npm run dev:stack
```

### Windows Users
The `dev:stack` script is a bash script. If you are on Windows, you can run it using Git Bash or Windows Subsystem for Linux (WSL).

## API Endpoints

- `POST /api/v1/prompt/assemble`: Assembles the `system` and `user` prompts from the provided inputs.
- `POST /api/v1/prompt/generate`: Executes the full prompt pipeline: assembly → LLM call → validation. Returns the raw LLM output and metadata.
- `POST /api/v1/ai/fill`: Takes a description of a field and its context and returns AI-generated content to fill it.
- `GET /api/v1/traces`: Retrieves all trace events recorded by the backend.
- `GET /api/v1/logs`: Retrieves all log records recorded by the backend.

## LLM Configuration
The backend uses LLM adapters to generate event payloads. You can configure the adapter and its behavior using the following environment variables:

- `LLM_PROVIDER`: Specifies the LLM provider to use.
  - `mock`: (Default) Uses a deterministic mock adapter for testing and local development.
  - `openai`: Uses the OpenAI API to generate event payloads.
  - `langchain`: Uses the LangChain library to generate event payloads.

- `STRICT_JSON`: Determines how the `DirectOpenAIAdapter` handles invalid JSON responses.
  - `true`: Fail-fast on invalid JSON.
  - `false`: (Default) Attempt a single repair prompt on invalid JSON.

### Direct OpenAI Provider Settings
- `OPENAI_API_KEY`: Your OpenAI API key.
- `OPENAI_MODEL_NAME`: The name of the OpenAI model to use (e.g., `gpt-4-turbo`). Defaults to `gpt-4-turbo`.

### LangChain Provider Settings
- `LANGCHAIN_PROVIDER`: Specifies the LangChain provider to use.
  - `openai`: Uses the OpenAI API through LangChain.
  - `anthropic`: Uses the Anthropic API through LangChain.
- `ANTHROPIC_API_KEY`: Your Anthropic API key.

## Observability

The SynchronicityEngine includes a comprehensive observability system that provides detailed insights into the behavior of the engine and its agents.

- [Trace and Logs Schema](./docs/TraceAndLogsSchema.md): This document defines the schema for the `TraceSpan` and `LogRecord` types used in the SynchronicityEngine.
- [Agents Guide](./docs/Agents.md): This document provides guidance on how to use the observability features of the SynchronicityEngine to investigate and debug agent behavior.
