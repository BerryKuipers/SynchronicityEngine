"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResonancePanel = void 0;
var react_1 = require("react");
var ResonancePanel = function (_a) {
    var resonance = _a.resonance, level = _a.level, energy = _a.energy;
    return (<section className="resonance-panel">
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
    </section>);
};
exports.ResonancePanel = ResonancePanel;
