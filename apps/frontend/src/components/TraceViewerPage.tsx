import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TraceSpan, LogRecord } from '@synchronicity/trace'

export function TraceViewerPage() {
  const { traceId } = useParams<{ traceId: string }>()
  const [spans, setSpans] = useState<TraceSpan[]>([])
  const [logs, setLogs] = useState<LogRecord[]>([])
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'trace' | 'logs'>('trace')
  const [logLevelFilter, setLogLevelFilter] = useState<string>('')
  const [logTopicFilter, setLogTopicFilter] = useState<string>('')

  useEffect(() => {
    async function fetchData() {
      try {
        const [traceResponse, logsResponse] = await Promise.all([
          fetch(`/api/v1/trace/${traceId}`),
          fetch(`/api/v1/trace/${traceId}/logs`),
        ])

        if (!traceResponse.ok) {
          throw new Error(`HTTP error! status: ${traceResponse.status}`)
        }
        if (!logsResponse.ok) {
            throw new Error(`HTTP error! status: ${logsResponse.status}`)
        }

        const traceData = await traceResponse.json()
        const logsData = await logsResponse.json()

        setSpans(traceData)
        setLogs(logsData)
      } catch (e) {
        setError(e.message)
      }
    }

    if (traceId) {
      fetchData()
    }
  }, [traceId])

  const filteredLogs = logs.filter(log => {
    return (
      (logLevelFilter === '' || log.level === logLevelFilter) &&
      (logTopicFilter === '' || log.topic.includes(logTopicFilter))
    )
  })

  if (error) {
    return <div>Error: {error}</div>
  }

  const downloadNdjson = () => {
    const ndjson = logs.map(log => JSON.stringify(log)).join('\n');
    const blob = new Blob([ndjson], { type: 'application/x-ndjson' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${traceId}.ndjson`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <h1>Trace Viewer</h1>
      <h2>Trace ID: {traceId}</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab('trace')} className={activeTab === 'trace' ? 'active' : ''}>Trace</button>
        <button onClick={() => setActiveTab('logs')} className={activeTab === 'logs' ? 'active' : ''}>Logs</button>
      </div>

      {activeTab === 'trace' && (
        <pre>{JSON.stringify(spans, null, 2)}</pre>
      )}

      {activeTab === 'logs' && (
        <div>
          <div className="filters">
            <input type="text" placeholder="Filter by level" value={logLevelFilter} onChange={e => setLogLevelFilter(e.target.value)} />
            <input type="text" placeholder="Filter by topic" value={logTopicFilter} onChange={e => setLogTopicFilter(e.target.value)} />
            <button onClick={downloadNdjson}>Export NDJSON</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Level</th>
                <th>Topic</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.ts}>
                  <td>{new Date(log.ts).toISOString()}</td>
                  <td>{log.level}</td>
                  <td>{log.topic}</td>
                  <td>{log.msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
