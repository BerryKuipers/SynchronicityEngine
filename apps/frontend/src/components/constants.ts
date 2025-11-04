export const initialFormState = {
  layer: 'physical',
  lawVersion: 'v1',
  personaVersion: 'v1',
  beliefs: JSON.stringify(
    {
      beliefs: [
        {
          id: 'belief-1',
          description: 'The world is a friendly place',
          intensity: 0.8,
          rigidity: 0.5,
        },
      ],
    },
    null,
    2
  ),
  world: JSON.stringify(
    {
      time: 123456,
      energy: 0.9,
      resonance: 0.8,
      narrative: 'The user is on a journey of self-discovery',
    },
    null,
    2
  ),
  blueprint: JSON.stringify(
    {
      themes: ['exploration', 'connection'],
      excitement: [
        {
          keywords: ['art', 'music'],
          intensity: 0.9,
        },
      ],
    },
    null,
    2
  ),
  userIntent: 'I want to explore a new creative hobby',
  seed: '12345',
};
