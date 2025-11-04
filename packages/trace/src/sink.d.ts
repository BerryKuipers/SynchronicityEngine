import { TraceSpan, TraceId } from './types';
export interface ITraceSink {
    append(span: TraceSpan): void;
    head(traceId: TraceId): TraceSpan[];
    get(traceId: TraceId): TraceSpan[];
}
export declare function createInMemoryWithNdjson(dir: string): ITraceSink;
