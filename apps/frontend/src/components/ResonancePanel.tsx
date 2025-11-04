import type { ResonanceVM } from '../domain/viewModels.js';
import React from 'react';

type Props = {
  resonance: ResonanceVM;
};

export const ResonancePanel: React.FC<Props> = ({ resonance }) => {
  return (
    <section className="resonance-panel">
      <h2>Resonance</h2>
      <p className="resonance-level">Score: {resonance.score}</p>
      <div className="resonance-stats">
        <div>
          <span className="label">Vector</span>
          <span>{resonance.vector.join(', ')}</span>
        </div>
      </div>
    </section>
  );
};
