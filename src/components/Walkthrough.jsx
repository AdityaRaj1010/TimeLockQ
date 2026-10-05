import { useState, useLayoutEffect } from 'react';
import { C } from '../gameData.js';

export default function Walkthrough({ refs, onClose }) {
  const steps = [
    { key: 'intro', title: 'Welcome, Commander', target: null,
      body: 'The Clockbreakers are copying KGRN\'s encrypted data to crack it in the future. Your job: secure all 6 sites before they collect enough. The timer is paused while you read this.' },
    { key: 'meter', title: '1 · Watch the harvest', target: refs.meter,
      body: 'This bar fills as data is stolen. If it reaches 100%, you lose. Securing nodes slows it down — so every fix buys you time.' },
    { key: 'map', title: '2 · Read the map', target: refs.map,
      body: 'Each station shows a colored ring (how much risk is left) and a numbered badge (fix-first order). Red #1 is most urgent. Hover any node for details, and tap one to open it.' },
    { key: 'panel', title: '3 · Apply the fixes', target: refs.panel,
      body: 'When a node is selected, its fixes appear here. Each shows its cost in tokens and how much risk it removes. Start with Upgrade VPN — it removes the most.' },
    { key: 'log', title: '4 · Follow the log', target: refs.log,
      body: 'Live updates and occasional alerts appear here. Some alerts are threats, some are helpful intel — read them and choose.' },
    { key: 'go', title: 'You\'re ready', target: null,
      body: 'Aim for the red #1 nodes first, apply VPN early, and keep the harvest bar low. Close this to start — the timer begins now. Good luck.' },
  ];

  const [i, setI] = useState(0);
  const [rect, setRect] = useState(null);
  const step = steps[i];
  const last = i === steps.length - 1;

  // Keyed on the step index (a stable primitive) — depending on the `step`
  // object would re-run every render (steps is rebuilt each time) and loop.
  useLayoutEffect(() => {
    const el = steps[i].target?.current;
    const measure = () => setRect(el ? el.getBoundingClientRect() : null);
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => { window.removeEventListener('resize', measure); window.removeEventListener('scroll', measure, true); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  // card placement
  let cardStyle;
  if (!rect) {
    cardStyle = { left: '50%', top: '50%', transform: 'translate(-50%,-50%)' };
  } else {
    const cx = rect.left + rect.width / 2;
    const left = Math.min(Math.max(cx - 150, 12), window.innerWidth - 312);
    if (window.innerHeight - rect.bottom > 210) cardStyle = { left, top: rect.bottom + 14 };
    else cardStyle = { left, bottom: window.innerHeight - rect.top + 14 };
  }

  const pad = 8;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1001 }}>
      {/* dimmer with a spotlight hole, or a plain scrim for centered steps */}
      {rect ? (
        <div style={{
          position: 'fixed',
          left: rect.left - pad, top: rect.top - pad,
          width: rect.width + pad * 2, height: rect.height + pad * 2,
          borderRadius: '6px', border: `1.5px solid ${C.cyan}`,
          boxShadow: `0 0 0 9999px rgba(2,6,2,.8), 0 0 22px -2px ${C.cyan}`,
          transition: 'all .25s ease', pointerEvents: 'none',
        }} />
      ) : (
        <div onClick={() => {}} style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,2,.82)', backdropFilter: 'blur(2px)' }} />
      )}

      <div className="tq-tour-card" style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '9px', color: C.dim, letterSpacing: '2px' }}>GUIDED TOUR</span>
          <span style={{ fontSize: '9px', color: C.borderBright }}>{i + 1} / {steps.length}</span>
        </div>
        <div className="glow" style={{ fontSize: '14px', color: C.cyan, fontWeight: 800, marginBottom: '7px' }}>{step.title}</div>
        <p style={{ fontSize: '11px', color: C.greenSoft, lineHeight: 1.65, marginBottom: '13px' }}>{step.body}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* progress dots */}
          <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
            {steps.map((_, k) => (
              <span key={k} style={{ width: k === i ? '14px' : '6px', height: '6px', borderRadius: '3px', background: k === i ? C.cyan : k < i ? C.borderBright : C.border, transition: 'all .2s' }} />
            ))}
          </div>
          {i > 0 && (
            <button onClick={() => setI(i - 1)} style={{ border: `1px solid ${C.border}`, background: 'transparent', color: C.dim, fontSize: '11px', padding: '7px 11px', cursor: 'pointer', borderRadius: '3px' }}>Back</button>
          )}
          <button onClick={() => (last ? onClose() : setI(i + 1))} style={{ border: `1px solid ${C.cyan}`, background: 'rgba(70,217,255,.08)', color: C.cyan, fontSize: '11px', fontWeight: 700, padding: '7px 14px', cursor: 'pointer', borderRadius: '3px' }}>
            {last ? 'Start ▸' : 'Next'}
          </button>
        </div>

        {!last && (
          <button onClick={onClose} style={{ marginTop: '10px', width: '100%', border: 'none', background: 'transparent', color: C.dim, fontSize: '10px', cursor: 'pointer', letterSpacing: '.5px' }}>Skip tour</button>
        )}
      </div>
    </div>
  );
}
