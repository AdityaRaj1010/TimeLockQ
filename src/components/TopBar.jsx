import { C } from '../gameData.js';

export default function TopBar({ tokens, harvest, secured, score }) {
  const hp = Math.min(100, harvest);
  const critical = hp > 75;
  const hc = hp > 75 ? C.red : hp > 45 ? C.orange : C.yellow;

  const stats = [
    ['TOKENS', tokens, C.cyan],
    ['SCORE', score, C.green],
    ['SECURED', `${secured}/6`, secured === 6 ? C.green : C.greenSoft],
    ['HARVEST', `${Math.floor(hp)}%`, hc],
  ];

  return (
    <div className="tq-panel" style={{ padding: '12px 14px', marginBottom: '12px', borderRadius: '3px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '12px' }}>
        {stats.map(([l, v, c]) => (
          <div key={l} style={{ textAlign: 'center', padding: '2px 0' }}>
            <div style={{ fontSize: '9px', color: C.dim, letterSpacing: '2px', marginBottom: '3px' }}>{l}</div>
            <div className="glow" style={{ fontSize: '20px', fontWeight: 800, color: c, lineHeight: 1 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '9px', color: C.dim, letterSpacing: '1px', whiteSpace: 'nowrap' }}>HARVEST</span>
        <div
          style={{
            position: 'relative', flex: 1, height: '14px',
            background: '#060906',
            border: `1px solid ${critical ? C.red : C.border}`,
            borderRadius: '2px', overflow: 'hidden',
          }}
          role="progressbar" aria-valuenow={Math.floor(hp)} aria-valuemin={0} aria-valuemax={100}
          aria-label="Clockbreaker data harvest progress"
        >
          {/* segment ticks */}
          {[45, 75].map((t) => (
            <div key={t} style={{ position: 'absolute', left: `${t}%`, top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,.6)', zIndex: 2 }} />
          ))}
          <div
            className={critical ? 'pulse' : undefined}
            style={{
              height: '100%', width: `${hp}%`,
              background: `linear-gradient(90deg, ${C.yellow}, ${C.orange} 60%, ${C.red})`,
              boxShadow: `0 0 12px -1px ${hc}`,
              transition: 'width .5s ease',
            }}
          />
        </div>
        <span
          className={critical ? 'blink' : undefined}
          style={{ fontSize: '9px', color: critical ? C.red : C.dim, letterSpacing: '1px', whiteSpace: 'nowrap', fontWeight: critical ? 700 : 400 }}
        >
          100% = OVER
        </span>
      </div>
    </div>
  );
}
