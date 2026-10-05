import { C } from '../gameData.js';

export default function EventModal({ event, onResolve, onDismiss }) {
  if (!event) return null;
  const accent = event.threat ? C.red : C.yellow;
  return (
    <div
      onClick={onDismiss}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(2,6,2,.82)', backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="alertdialog" aria-label={event.title}
        className="fade-in tq-panel"
        style={{ border: `2px solid ${accent}`, boxShadow: `0 0 40px -8px ${accent}`, padding: '18px 20px', maxWidth: '400px', width: '100%', borderRadius: '4px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', color: C.dim, letterSpacing: '2px', marginBottom: '10px' }}>
          <span className={event.threat ? 'blink' : undefined} style={{ color: accent, fontSize: '12px' }}>{event.threat ? '⚠' : '▸'}</span>
          <span>TIMELOCKQ ALERT</span>
          <span style={{ marginLeft: 'auto', color: accent }}>{event.threat ? 'THREAT' : 'INTEL'}</span>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '12px', marginBottom: '14px' }}>
          <div className="glow" style={{ fontSize: '14px', color: accent, fontWeight: 800, marginBottom: '9px', letterSpacing: '.5px' }}>{event.title}</div>
          <p style={{ fontSize: '11px', color: C.greenSoft, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{event.msg}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onResolve} style={{ flex: 1, border: `1px solid ${accent}`, background: 'transparent', color: accent, fontSize: '11px', fontWeight: 700, padding: '10px', cursor: 'pointer', borderRadius: '2px', letterSpacing: '.5px' }}>{event.btn}</button>
          <button onClick={onDismiss} style={{ border: `1px solid ${C.border}`, background: 'transparent', color: C.dim, fontSize: '11px', padding: '10px 16px', cursor: 'pointer', borderRadius: '2px' }}>DISMISS</button>
        </div>
      </div>
    </div>
  );
}
