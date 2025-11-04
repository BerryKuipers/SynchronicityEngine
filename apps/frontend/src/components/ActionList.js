"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionList = void 0;
var react_1 = require("react");
var ActionList = function (_a) {
    var actions = _a.actions, onSelect = _a.onSelect, disabled = _a.disabled;
    if (!actions.length) {
        return <p>No actions are currently available.</p>;
    }
    return (<ul className="action-list">
      {actions.map(function (action) { return (<li key={action.id}>
          <button type="button" onClick={function () {
                void onSelect(action.id);
            }} disabled={disabled} className="action-button">
            <strong>{action.label}</strong>
            <span>{action.description}</span>
            <span className="action-cost">Cost: {action.cost}</span>
          </button>
        </li>); })}
    </ul>);
};
exports.ActionList = ActionList;
