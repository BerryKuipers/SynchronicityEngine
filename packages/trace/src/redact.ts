import { TraceSpan } from './types'

function redact(obj: any, maxLength = 256): any {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (typeof obj === 'string') {
    if (obj.length > maxLength) {
      return obj.substring(0, maxLength) + '...[truncated]'
    }
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => redact(item, maxLength))
  }

  if (typeof obj === 'object') {
    const newObj: { [key: string]: any } = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = redact(obj[key], maxLength)
      }
    }
    return newObj
  }

  return obj
}

export function redactSpan(span: TraceSpan): TraceSpan {
    if (span.outputs && span.outputs.event) {
        return {
            ...span,
            outputs: {
                ...span.outputs,
                event: redact(span.outputs.event)
            }
        }
    }
    return span
}
