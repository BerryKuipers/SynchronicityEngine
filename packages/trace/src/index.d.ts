export type { TraceEvent } from './types';
export declare const createTraceSink: () => {
    trace: (e: unknown) => void;
};
