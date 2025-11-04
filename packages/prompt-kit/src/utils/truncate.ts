export function truncateForModel(
  system: string,
  user: string,
  maxTokens: number
): { system: string; user: string } {
  const totalTokens = system.length + user.length; // Simplified token estimation
  if (totalTokens <= maxTokens) {
    return { system, user };
  }

  const userTokens = Math.floor((user.length / totalTokens) * maxTokens);
  const systemTokens = maxTokens - userTokens;

  return {
    system: system.slice(0, systemTokens),
    user: user.slice(0, userTokens),
  };
}
