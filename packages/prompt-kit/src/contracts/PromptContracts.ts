export interface IPromptRegistry<K, V> {
  load(key: K, version: V): Promise<{ path: string; body: string }>;
}

export interface IRenderer<TInput> {
  render(input: TInput): string;
}

export type ChatAssembly = {
  system: string;
  user: string;
  meta: {
    layer: string;
    lawVersion: string;
    personaVersion: string;
    seed: string;
    promptHash: string;
    components: {
      lawPath: string;
      personaPath: string;
      beliefsCount: number;
      excitementCount: number;
      blueprintThemes: string[];
    };
  };
};
