import React, { useState } from 'react';
import { initialFormState } from './constants.js';
import { AiField } from './ai/AiField.js';
import './PromptPlaygroundPage.css';

const formFields = [
  { name: 'layer', label: 'Layer', type: 'text' },
  { name: 'lawVersion', label: 'Law Version', type: 'text' },
  { name: 'personaVersion', label: 'Persona Version', type: 'text' },
  { name: 'seed', label: 'Seed', type: 'text' },
];

export const PromptPlaygroundPage: React.FC = () => {
  const [formState, setFormState] = useState(initialFormState);

  const [assemblyResponse, setAssemblyResponse] = useState<unknown>(null);
  const [generateResponse, setGenerateResponse] = useState<unknown>(null);
  const [isAssembling, setIsAssembling] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAiFieldChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleApiCall = async (
    endpoint: 'assemble' | 'generate',
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setResponse: React.Dispatch<React.SetStateAction<unknown>>
  ) => {
    setLoading(true);
    try {
      const { beliefs, world, blueprint, ...rest } = formState;
      let body;
      try {
        body = {
          ...rest,
          beliefs: JSON.parse(beliefs),
          world: JSON.parse(world),
          blueprint: JSON.parse(blueprint),
        };
      } catch (e) {
        setResponse({ error: `Invalid JSON format: ${(e as Error).message}` });
        return;
      }

      const response = await fetch(`/api/v1/prompt/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }
      setResponse(data);
    } catch (error) {
      if (error instanceof Error) {
        setResponse({ error: error.message });
      } else {
        setResponse({ error: 'An unknown error occurred.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <h1>Prompt Playground</h1>

      {formFields.map(({ name, label, type }) => (
        <div key={name} className="formGroup">
          <label className="label">{label}</label>
          <input
            type={type}
            name={name}
            value={formState[name as keyof typeof formState]}
            onChange={handleChange}
            className="input"
          />
        </div>
      ))}

      <div className="formGroup">
        <label className="label">Beliefs</label>
        <AiField
          id="beliefs"
          kind="json"
          purpose="A set of beliefs that the user holds."
          value={formState.beliefs}
          onChange={(value) => handleAiFieldChange('beliefs', value)}
          layer={formState.layer}
        />
      </div>

      <div className="formGroup">
        <label className="label">World</label>
        <AiField
          id="world"
          kind="json"
          purpose="The current state of the world."
          value={formState.world}
          onChange={(value) => handleAiFieldChange('world', value)}
          layer={formState.layer}
        />
      </div>

      <div className="formGroup">
        <label className="label">Blueprint</label>
        <AiField
          id="blueprint"
          kind="json"
          purpose="The user's blueprint."
          value={formState.blueprint}
          onChange={(value) => handleAiFieldChange('blueprint', value)}
          layer={formState.layer}
        />
      </div>

      <div className="formGroup">
        <label className="label">User Intent</label>
        <AiField
          id="userIntent"
          kind="short_text"
          purpose="The user's intent."
          value={formState.userIntent}
          onChange={(value) => handleAiFieldChange('userIntent', value)}
          layer={formState.layer}
        />
      </div>


      <div>
        <button
          onClick={() => handleApiCall('assemble', setIsAssembling, setAssemblyResponse)}
          className="button"
          disabled={isAssembling}
        >
          {isAssembling ? 'Assembling...' : 'Assemble'}
        </button>
        <button
          onClick={() => handleApiCall('generate', setIsGenerating, setGenerateResponse)}
          className="button"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {Boolean(assemblyResponse) && (
        <div className="responseContainer">
          <h2>Assembly Response</h2>
          <pre>{JSON.stringify(assemblyResponse, null, 2)}</pre>
        </div>
      )}

      {Boolean(generateResponse) && (
        <div className="responseContainer">
          <h2>Generate Response</h2>
          <pre>{JSON.stringify(generateResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
