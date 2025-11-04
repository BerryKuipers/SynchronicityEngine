import * as path from 'path';
import { LawRegistry } from './LawRegistry';
import { PersonaRegistry } from './PersonaRegistry';
import { BeliefRenderer } from './render/BeliefRenderer';
import { WorldStateRenderer } from './render/WorldStateRenderer';
import { BlueprintRenderer } from './render/BlueprintRenderer';
import { renderGuardrails } from './render/GuardrailsComposer';
import { PromptAssemblyInput, ChatAssembly } from './types';
import { createSha256Hash, truncateForModel } from './utils';

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
    renderGuardrails(String(i.seed), i.guardrails),
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
      seed: String(i.seed),
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
