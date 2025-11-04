export function renderGuardrails(seed: string, extra?: string[]): string {
  const guardrails = [
    'Maintain a consistent persona.',
    'Output only the requested JSON schema.',
    'Base decisions on the provided belief systems and world state.',
    `Seed for deterministic variance: ${seed}`,
  ];

  if (extra) {
    guardrails.push(...extra);
  }

  return `[GUARDRAILS]
${guardrails.map((g) => `- ${g}`).join('\n')}`;
}
