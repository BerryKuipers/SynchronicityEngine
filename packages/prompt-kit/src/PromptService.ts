import * as path from 'path';
import { LawRegistry } from './LawRegistry.js';
import { PersonaRegistry } from './PersonaRegistry.js';
import { BeliefRenderer } from './render/BeliefRenderer.js';
import { WorldStateRenderer } from './render/WorldStateRenderer.js';
import { BlueprintRenderer } from './render/BlueprintRenderer.js';
import { renderGuardrails } from './render/GuardrailsComposer.js';
import { PromptAssemblyInput, ChatAssembly } from './types.js';
import { createSha256Hash, truncateForModel } from './utils/index.js';

const promptsBasePath = path.join(__dirname, '..', '..', '..', 'config', 'prompts');
const lawRegistry = new LawRegistry(promptsBasePath);
const personaRegistry = new PersonaRegistry(promptsBasePath);

const beliefRenderer = new BeliefRenderer();
const worldStateRenderer = new WorldStateRenderer();
const blueprintRenderer = new BlueprintRenderer();

export async function assembleChat(
  i: PromptAssemblyInput
): Promise<ChatAssembly> {
  const law = await lawRegistry.load(
    { layer: i.layer },
    { version: i.lawVersion }
  );
  const persona = await personaRegistry.load(null, {
    version: i.personaVersion,
  });

  const systemParts = [
    law.body,
    persona.body,
    renderGuardrails(i.seed, i.guardrails),
  ];
  const userParts = [
    beliefRenderer.render(i.beliefs),
    worldStateRenderer.render(i.world),
    blueprintRenderer.render(i.blueprint),
    `[USER INTENT]\n${i.userIntent}`,
  ];

  let system = systemParts.join('\n\n');
  let user = userParts.join('\n\n');

  if (process.env.MODEL_MAX_TOKENS) {
    const { system: truncSystem, user: truncUser } = truncateForModel(
      system,
      user,
      parseInt(process.env.MODEL_MAX_TOKENS, 10)
    );
    system = truncSystem;
    user = truncUser;
  }

  const promptHash = createSha256Hash(system + '\n---\n' + user);

  return {
    system,
    user,
    meta: {
      layer: i.layer,
      lawVersion: i.lawVersion,
      personaVersion: i.personaVersion,
      seed: i.seed,
      promptHash,
      components: {
        lawPath: law.path,
        personaPath: persona.path,
        beliefsCount: i.beliefs.beliefs.length,
        excitementCount: i.blueprint.excitement.length,
        blueprintThemes: i.blueprint.themes,
      },
    },
  };
}

/**
 * @deprecated Use assembleChat instead.
 */
export async function assemblePrompt(
  i: PromptAssemblyInput
): Promise<{ prompt: string; meta: ChatAssembly['meta'] }> {
  const { system, user, meta } = await assembleChat(i);
  // TODO: Add a deprecation warning log.
  return {
    prompt: `${system}\n\n${user}`,
    meta,
  };
}
