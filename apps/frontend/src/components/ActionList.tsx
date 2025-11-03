import type { Action } from '@synchronicity/shared';
import React from 'react';

type Props = {
  actions: Action[];
  onSelect: (actionId: string) => Promise<void> | void;
  disabled?: boolean;
};

export const ActionList: React.FC<Props> = ({ actions, onSelect, disabled }) => {
  if (!actions.length) {
    return <p>No actions are currently available.</p>;
  }
  return (
    <ul className="action-list">
      {actions.map((action) => (
        <li key={action.id}>
          <button
            type="button"
            onClick={() => {
              void onSelect(action.id);
            }}
            disabled={disabled}
            className="action-button"
          >
            <strong>{action.label}</strong>
            <span>{action.description}</span>
            <span className="action-cost">Cost: {action.cost}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
