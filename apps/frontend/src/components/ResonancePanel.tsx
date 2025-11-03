import type { ResonanceVector } from '@synchronicity/shared';
import React from 'react';

type Props = {
  resonance: ResonanceVector;
  level: string;
  energy: number;
};

export const ResonancePanel: React.FC<Props> = ({ resonance, level, energy }) => {
  return (
    <section className="resonance-panel">
      <h2>Resonance</h2>
      <p className="resonance-level">Level: {level}</p>
      <div className="resonance-stats">
        <div>
          <span className="label">Focus</span>
          <span>{resonance.focus}</span>
        </div>
        <div>
          <span className="label">Intuition</span>
          <span>{resonance.intuition}</span>
        </div>
        <div>
          <span className="label">Harmony</span>
          <span>{resonance.harmony}</span>
        </div>
      </div>
      <p className="energy">Energy: {energy}</p>
    </section>
  );
};
