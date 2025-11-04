import { LawRegistry } from './LawRegistry';
import { PersonaRegistry } from './PersonaRegistry';
import {
  BeliefRenderer,
  WorldStateRenderer,
  BlueprintRenderer,
  GuardrailsComposer,
} from './renderers';
import { hashString } from './utils';

interface PromptInput {
  layer: string;
  lawVersion: string;
  personaVersion: string;
  beliefs: Record<string, any>;
  worldState: Record<string, any>;
  blueprint: Record<string, any>;
  guardrails: string[];
}

interface AssembledPrompt {
  prompt: string;
  meta: {
    promptHash: string;
    components: {
      layer: string;
      lawVersion: string;
      personaVersion: string;
      beliefs: boolean;
      worldState: boolean;
      blueprint: boolean;
      guardrails: boolean;
    };
  };
}

export class PromptService {
  private lawRegistry: LawRegistry;
  private personaRegistry: PersonaRegistry;

  constructor(lawRegistry: LawRegistry, personaRegistry: PersonaRegistry) {
    this.lawRegistry = lawRegistry;
    this.personaRegistry = personaRegistry;
  }

  async assemble(input: PromptInput): Promise<AssembledPrompt> {
    await this.lawRegistry.load(input.layer);
    await this.personaRegistry.load();

    const law = this.lawRegistry.get(input.layer, input.lawVersion);
    const persona = this.personaRegistry.get(input.personaVersion);

    if (!law) {
      throw new Error(`Law not found for layer ${input.layer} and version ${input.lawVersion}`);
    }
    if (!persona) {
      throw new Error(`Persona not found for version ${input.personaVersion}`);
    }

    const components = [
      persona.content,
      law.content,
      BeliefRenderer(input.beliefs),
      WorldStateRenderer(input.worldState),
      BlueprintRenderer(input.blueprint),
      GuardrailsComposer(input.guardrails),
    ].filter(Boolean);

    const prompt = components.join('\n\n');
    const promptHash = hashString(prompt);

    return {
      prompt,
      meta: {
        promptHash,
        components: {
          layer: input.layer,
          lawVersion: input.lawVersion,
          personaVersion: input.personaVersion,
          beliefs: Object.keys(input.beliefs).length > 0,
          worldState: Object.keys(input.worldState).length > 0,
          blueprint: Object.keys(input.blueprint).length > 0,
          guardrails: input.guardrails.length > 0,
        },
      },
    };
  }
}
