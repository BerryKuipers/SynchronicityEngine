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
