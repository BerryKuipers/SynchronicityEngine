export const BeliefRenderer = (beliefs: Record<string, any>): string => {
  return `Beliefs:\n${JSON.stringify(beliefs, null, 2)}`;
};

export const WorldStateRenderer = (worldState: Record<string, any>): string => {
  return `World State:\n${JSON.stringify(worldState, null, 2)}`;
};

export const BlueprintRenderer = (blueprint: Record<string, any>): string => {
  return `Blueprint:\n${JSON.stringify(blueprint, null, 2)}`;
};

export const GuardrailsComposer = (guardrails: string[]): string => {
  return `Guardrails:\n- ${guardrails.join('\n- ')}`;
};
