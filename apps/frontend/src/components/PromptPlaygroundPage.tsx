import React, { useState } from 'react';

const formContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '800px',
  margin: '0 auto',
  fontFamily: 'monospace',
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '1rem',
};

const labelStyle: React.CSSProperties = {
  marginBottom: '0.5rem',
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  fontFamily: 'monospace',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  height: '100px',
};

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  cursor: 'pointer',
  marginRight: '1rem',
};

const responseContainerStyle: React.CSSProperties = {
  marginTop: '2rem',
  padding: '1rem',
  border: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
};

export const PromptPlaygroundPage: React.FC = () => {
  const [formState, setFormState] = useState({
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
  });

  const [assemblyResponse, setAssemblyResponse] = useState<any>(null);
  const [generateResponse, setGenerateResponse] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssemble = async () => {
    setAssemblyResponse('Loading...');
    try {
      const { beliefs, world, blueprint, ...rest } = formState;
      const params = new URLSearchParams({
        ...rest,
        beliefs: beliefs,
        world: world,
        blueprint: blueprint,
      });

      const response = await fetch(`/api/v1/prompt/assemble?${params.toString()}`);
      const data = await response.json();
      setAssemblyResponse(data);
    } catch (error) {
      setAssemblyResponse({ error: error.message });
    }
  };

  const handleGenerate = async () => {
    setGenerateResponse('Loading...');
    try {
      const { beliefs, world, blueprint, ...rest } = formState;
      const body = {
        ...rest,
        beliefs: JSON.parse(beliefs),
        world: JSON.parse(world),
        blueprint: JSON.parse(blueprint),
      };

      const response = await fetch('/api/v1/prompt/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setGenerateResponse(data);
    } catch (error) {
      setGenerateResponse({ error: error.message });
    }
  };

  return (
    <div style={formContainerStyle}>
      <h1>Prompt Playground</h1>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Layer</label>
        <input
          type="text"
          name="layer"
          value={formState.layer}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Law Version</label>
        <input
          type="text"
          name="lawVersion"
          value={formState.lawVersion}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Persona Version</label>
        <input
          type="text"
          name="personaVersion"
          value={formState.personaVersion}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Beliefs</label>
        <textarea
          name="beliefs"
          value={formState.beliefs}
          onChange={handleChange}
          style={textareaStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>World</label>
        <textarea
          name="world"
          value={formState.world}
          onChange={handleChange}
          style={textareaStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Blueprint</label>
        <textarea
          name="blueprint"
          value={formState.blueprint}
          onChange={handleChange}
          style={textareaStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>User Intent</label>
        <input
          type="text"
          name="userIntent"
          value={formState.userIntent}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Seed</label>
        <input
          type="text"
          name="seed"
          value={formState.seed}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div>
        <button onClick={handleAssemble} style={buttonStyle}>
          Assemble
        </button>
        <button onClick={handleGenerate} style={buttonStyle}>
          Generate
        </button>
      </div>

      {assemblyResponse && (
        <div style={responseContainerStyle}>
          <h2>Assembly Response</h2>
          <pre>{JSON.stringify(assemblyResponse, null, 2)}</pre>
        </div>
      )}

      {generateResponse && (
        <div style={responseContainerStyle}>
          <h2>Generate Response</h2>
          <pre>{JSON.stringify(generateResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
