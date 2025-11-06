import type { TimelineItem } from '../domain/viewModels.js';
import React from 'react';

type Props = {
  actions: TimelineItem[];
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
          </button>
        </li>
      ))}
    </ul>
  );
};
