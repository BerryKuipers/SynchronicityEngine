# Agents Guidelines

This document defines guidelines for building AI agents that embody the layers of consciousness within the SynchronicityEngine. Each agent should be implemented as a class that adheres to the interfaces defined in `src/interfaces`. Agents should be self‑contained, mutable where appropriate, and avoid hard‑coded mocks.

## Principles

- **Single responsibility**: each agent encapsulates the logic for one consciousness layer only.
- **Statefulness**: agents maintain their own belief systems, vibration metrics and internal state.
- **Interactions**: communication between agents occurs through explicit method calls on the shared engine.
- **Extensibility**: new layers or behaviours can be added by implementing additional interfaces without modifying existing code.
- **TODO markers**: where functionality is incomplete, include `TODO:` to indicate work needed. Do not stub functions silently.
- **No mocks**: avoid returning fake data or placeholder responses inside production code. Use TODOs instead.

## Implementation Notes

Classes should use single quotes for string literals and avoid inline comments except where a `TODO:` is necessary. Use TypeScript’s typing system to enforce contract boundaries between layers. See the files under `src/layers` for examples of basic agent implementations.

## Disk hygiene (hard rule - D: has filled up repeatedly)

- Worktrees live ONLY at `<repo>/.claude/worktrees/<branch-slug>`. Never a sibling dir (`../Repo-fix`, `Repo.worktrees`) and never shared dirs like `D:\berry\Projects\_worktrees`, `_scratch`, `_tmp`, `_codex_worktrees`.
- Remove the worktree in the same turn its branch lands or is abandoned. Check `git status --porcelain` and unpushed commits first; salvage real work, then plain `git worktree remove` (no `--force`).
- Scratch/temp output goes in `$env:TEMP` or `<repo>/.claude/tmp` (gitignored), never loose in `D:\berry\Projects`. Delete it before you finish.
- Never copy or clone a repo per task. Junction `node_modules` to the main checkout; never run `npm ci` inside a worktree.
- Renders, captures, models, datasets and VM images go in one named folder and are deleted at the end unless the user asked to keep them.
- At session start and before handoff run `git worktree list`, stop processes you started, and report D: free space. Below 20 GB free: stop and clean up first.
