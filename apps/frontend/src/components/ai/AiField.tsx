import { useState } from 'react';
import { Button } from '../Button.js';

type AiFieldKind = 'short_text' | 'long_text' | 'json' | 'title' | 'tags';

interface AiFieldProps {
  id: string;
  kind: AiFieldKind;
  purpose: string;
  value: string;
  onChange: (value: string) => void;
  layer: string;
}

export function AiField({ id, kind, purpose, value, onChange, layer }: AiFieldProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);

  const handleFill = async () => {
    setIsLoading(true);
    setError(null);
    setConfidence(null);

    try {
      const response = await fetch('/api/v1/ai/fill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          layer,
          field: {
            id,
            kind,
            purpose,
            currentValue: value,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onChange(data.text);
      setConfidence(data.confidence);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = () => {
    switch (kind) {
      case 'long_text':
      case 'json':
        return (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-48 p-2 border rounded"
          />
        );
      case 'short_text':
      case 'title':
      case 'tags':
      default:
        return (
          <input
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border rounded"
          />
        );
    }
  };

  return (
    <div className="relative">
      {renderField()}
      <Button
        onClick={handleFill}
        disabled={isLoading}
        className="absolute top-2 right-2"
      >
        &#x2728;
      </Button>
      {isLoading && <div className="absolute bottom-2 left-2">Loading...</div>}
      {error && <div className="absolute bottom-2 left-2 text-red-500">{error}</div>}
      {confidence !== null && (
        <div className="absolute bottom-2 left-2">
          Confidence: {Math.round(confidence * 100)}%
        </div>
      )}
    </div>
  );
}
