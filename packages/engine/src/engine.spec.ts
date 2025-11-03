import assert from 'node:assert/strict';
import test from 'node:test';
import { createDefaultEngine } from './index.js';

void test('engine transitions after sufficient attunement', () => {
  const engine = createDefaultEngine();
  const sessionId = 'spec-session';
  engine.describe(sessionId);
  engine.performAction(sessionId, 'attune-breath');
  engine.performAction(sessionId, 'attune-breath');
  engine.performAction(sessionId, 'attune-breath');
  const result = engine.performAction(sessionId, 'open-gate');
  const snapshot = result.snapshot;
  assert.equal(result.applied, true);
  assert.equal(snapshot.sceneId, 'convergence');
  assert.equal(snapshot.history.length >= 4, true);
});

void test('engine enforces energy constraints', () => {
  const engine = createDefaultEngine();
  const sessionId = 'energy-session';
  engine.describe(sessionId);
  engine.performAction(sessionId, 'attune-breath');
  engine.performAction(sessionId, 'attune-breath');
  engine.performAction(sessionId, 'attune-breath');
  engine.performAction(sessionId, 'open-gate');
  let error: Error | undefined;
  try {
    engine.performAction(sessionId, 'release-echo');
  } catch (err) {
    error = err as Error;
  }
  assert.ok(error instanceof Error);
  assert.equal(error?.message, 'Insufficient energy for action');
});
