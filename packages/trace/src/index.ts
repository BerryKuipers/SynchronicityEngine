export type { TraceEvent } from './types'
export const createTraceSink = () => ({ trace: (e: unknown) => {} })
