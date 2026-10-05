import { C } from '../gameData.js';

export default function LogPanel({ logs }) {
  return (
    <div className="tq-panel" style={{ marginTop: '12px', borderRadius: '3px', overflow: 'hidden' }}>
      <div style={{ fontSize: '9px', color: C.dim, letterSpacing: '2px', padding: '7px 10px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between' }}>
        <span>EVENT LOG</span>
        <span style={{ color: C.borderBright }}>{logs.length} ENTRIES</span>
      </div>
      <div style={{ maxHeight: '92px', overflowY: 'auto', padding: '4px 10px' }}>
        {logs.map((l, i) => (
          <div key={i} style={{ fontSize: '10px', color: l.c || C.text, padding: '2px 0', lineHeight: 1.5, opacity: i === 0 ? 1 : Math.max(0.5, 1 - i * 0.06) }}>
            <span style={{ color: C.dim }}>›</span> {l.t}
          </div>
        ))}
      </div>
    </div>
  );
}
