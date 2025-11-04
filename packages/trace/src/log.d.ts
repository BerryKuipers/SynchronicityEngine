import { LogRecord } from './types';
export interface ILogSink {
    write(r: LogRecord): void;
}
export declare function createNdjsonLogger(dir: string, app: string): ILogSink;
