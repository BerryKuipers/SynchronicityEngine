import { LogRecord } from './types';
export declare class LogIndexer {
    private byTraceId;
    private byRunId;
    private byTopic;
    add(record: LogRecord): void;
    findByTraceId(traceId: string): LogRecord[];
    findByRunId(runId: string): LogRecord[];
    findByTopic(topic: string): LogRecord[];
}
