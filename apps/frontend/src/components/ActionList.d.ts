import type { Action } from '@synchronicity/shared';
import React from 'react';
type Props = {
    actions: Action[];
    onSelect: (actionId: string) => Promise<void> | void;
    disabled?: boolean;
};
export declare const ActionList: React.FC<Props>;
export {};
