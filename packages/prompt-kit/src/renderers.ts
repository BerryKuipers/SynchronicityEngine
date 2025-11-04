export const BeliefRenderer = (beliefs: Record<string, any>): string => {
  if (Object.keys(beliefs).length === 0) {
    return '';
  }
  return `Beliefs:\n${JSON.stringify(beliefs, null, 2)}`;
};

export const WorldStateRenderer = (worldState: Record<string, any>): string => {
  if (Object.keys(worldState).length === 0) {
    return '';
  }
  return `World State:\n${JSON.stringify(worldState, null, 2)}`;
};

export const BlueprintRenderer = (blueprint: Record<string, any>): string => {
  if (Object.keys(blueprint).length === 0) {
    return '';
  }
  return `Blueprint:\n${JSON.stringify(blueprint, null, 2)}`;
};

export const GuardrailsComposer = (guardrails: string[]): string => {
  if (guardrails.length === 0) {
    return '';
  }
  return `Guardrails:\n- ${guardrails.join('\n- ')}`;
};
