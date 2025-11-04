import React, { useState } from 'react';
import { Button } from '../Button'; // Assuming a Button component exists
import './AiField.css';

type AiFieldProps = {
  id: string;
  kind: 'short_text' | 'long_text' | 'json' | 'title' | 'tags';
  purpose: string;
  value: string;
  onChange: (value: string) => void;
  layer: string;
  lawVersion?: string;
  personaVersion?: string;
  beliefs?: object;
  world?: object;
  blueprint?: object;
  extraContext?: object;
};

export const AiField: React.FC<AiFieldProps> = ({
  id,
  kind,
  purpose,
  value,
  onChange,
  layer,
  lawVersion,
  personaVersion,
  beliefs,
  world,
  blueprint,
  extraContext,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);

  const handleFill = async () => {
    setLoading(true);
    setError(null);
    setConfidence(null);

    try {
      const response = await fetch('/api/v1/ai/fill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          layer,
          lawVersion,
          personaVersion,
          field: { id, kind, purpose, currentValue: value },
          beliefs,
          world,
          blueprint,
          extraContext,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI content');
      }

      const data = await response.json();
      onChange(data.text);
      setConfidence(data.confidence);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const InputComponent = kind === 'long_text' || kind === 'json' ? 'textarea' : 'input';

  return (
    <div className="ai-field">
      <InputComponent
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ai-field-input"
      />
      <Button onClick={handleFill} disabled={loading} className="ai-field-button">
        {loading ? '...' : '✨'}
      </Button>
      {error && <div className="ai-field-error">{error}</div>}
      {confidence !== null && (
        <div className="ai-field-confidence">Confidence: {confidence.toFixed(2)}</div>
      )}
    </div>
  );
};
