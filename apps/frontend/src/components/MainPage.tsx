import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { EngineSnapshot } from '@synchronicity/engine';
import { fetchSnapshot, submitAction } from '../api/client.js';
import { ActionList } from './ActionList.js';
import { ResonancePanel } from './ResonancePanel.js';

const DEFAULT_SESSION_ID = 'local-demo-session';

export const MainPage: React.FC = () => {
  const [sessionId] = useState(DEFAULT_SESSION_ID);
  const [snapshot, setSnapshot] = useState<EngineSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSnapshot = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSnapshot(sessionId);
      setSnapshot(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    void loadSnapshot();
  }, [loadSnapshot]);

  const handleAction = useCallback(
    async (actionId: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await submitAction(sessionId, actionId);
        setSnapshot(result.snapshot);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [sessionId],
  );

  const latestNarrative = useMemo(() => {
    if (!snapshot?.history.length) {
      return null;
    }
    return snapshot.history[snapshot.history.length - 1];
  }, [snapshot]);

  return (
    <div className="app-shell">
      <header>
        <h1>SynchronicityEngine</h1>
        <p className="session">Session: {sessionId}</p>
      </header>
      {error && <div className="error">{error}</div>}
      {snapshot ? (
        <main>
          <ResonancePanel resonance={snapshot.resonance} level={snapshot.resonanceLevel} energy={snapshot.energy} />
          <section className="scene">
            <h2>{snapshot.title}</h2>
            <p className="summary">{snapshot.summary}</p>
            {latestNarrative && (
              <p className="narrative">
                Last action: {latestNarrative.narrative} ({latestNarrative.resonanceLevel})
              </p>
            )}
            <ActionList actions={snapshot.availableActions} onSelect={handleAction} disabled={loading} />
          </section>
          <section className="history">
            <h2>History</h2>
            <ul>
              {snapshot.history.map((entry) => (
                <li key={`${entry.timestamp}-${entry.actionId}`}>
                  <span className="timestamp">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                  <span className="detail">{entry.narrative}</span>
                  <span className="level">{entry.resonanceLevel}</span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      ) : (
        <div className="loading-state">{loading ? 'Loading session...' : 'Preparing session...'}</div>
      )}
      <footer>
        <button type="button" onClick={() => void loadSnapshot()} disabled={loading}>
          Refresh snapshot
        </button>
      </footer>
    </div>
  );
};
