import {
  createDefaultEngine,
  EngineCommandPort,
  EngineQueryPort,
} from '@synchronicity/engine';
import { EngineSnapshotV1 } from '@synchronicity/shared';
import * as readline from 'readline';

const engine: EngineCommandPort & EngineQueryPort = createDefaultEngine();
const sessionId = 'cli-session';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function render(snapshot: EngineSnapshotV1): void {
  console.clear();
  console.log('--- Synchronicity Engine CLI ---');
  console.log('');
  snapshot.layers.forEach((layer: any) => {
    console.log(`Layer: ${layer.id}`);
    console.log(`  Vibration: ${layer.vibration.current}`);
    console.log(`  Alignment: ${layer.alignment}`);
  });
  console.log('');
  console.log('Timeline Hints:');
  snapshot.timelineHints.forEach((hint: string) => {
    console.log(`- ${hint}`);
  });
  console.log('');
  console.log('---');
}

async function main() {
  let snapshot = await engine.snapshot(sessionId);
  render(snapshot);

  rl.on('line', async (input) => {
    try {
      await engine.act(sessionId, input);
      snapshot = await engine.snapshot(sessionId);
      render(snapshot);
    } catch (error) {
      console.log('Error:', (error as Error).message);
    }
  });

  console.log('Enter an actionId to perform an action, or Ctrl+C to exit.');
}

main();
