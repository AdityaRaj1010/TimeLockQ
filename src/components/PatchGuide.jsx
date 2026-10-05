import { C, PATCHES } from '../gameData.js';

export default function PatchGuide({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,2,.85)', backdropFilter: 'blur(3px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog" aria-label="How the fixes work"
        className="pop-in tq-panel"
        style={{ maxWidth: '460px', width: '100%', maxHeight: '86vh', overflowY: 'auto', borderRadius: '5px', padding: '20px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <div>
            <div style={{ fontSize: '9px', color: C.dim, letterSpacing: '2px' }}>FIELD MANUAL</div>
            <div className="glow" style={{ fontSize: '16px', color: C.green, fontWeight: 800 }}>How the 4 fixes work</div>
          </div>
          <button onClick={onClose} aria-label="Close guide" style={{ border: `1px solid ${C.border}`, background: 'transparent', color: C.dim, fontSize: '14px', lineHeight: 1, padding: '5px 9px', cursor: 'pointer', borderRadius: '3px' }}>✕</button>
        </div>

        <p style={{ fontSize: '11px', color: C.text, lineHeight: 1.7, margin: '8px 0 16px' }}>
          Quantum computers of the future can break today's encryption. Each fix swaps an old, breakable lock for a quantum-proof one. Pick a node on the map, then apply these — <span style={{ color: C.greenSoft }}>higher % = more protection per token</span>.
        </p>

        {PATCHES.map((p, i) => (
          <div key={p.id} style={{ border: `1px solid ${C.border}`, borderLeft: `3px solid ${p.color}`, borderRadius: '3px', padding: '12px 13px', marginBottom: '10px', background: 'rgba(255,255,255,.015)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', color: p.color, fontWeight: 700 }}>{i + 1}. {p.label}</span>
              <span style={{ fontSize: '9px', color: C.yellow, fontWeight: 700, whiteSpace: 'nowrap' }}>{p.cost}t · −{p.dr}% risk</span>
            </div>
            <p style={{ fontSize: '11px', color: C.greenSoft, lineHeight: 1.6, marginBottom: '5px' }}>{p.plain}</p>
            <p style={{ fontSize: '10px', color: C.dim, lineHeight: 1.55, fontStyle: 'italic' }}>{p.analogy}</p>
            <p style={{ fontSize: '9px', color: C.borderBright, marginTop: '6px', letterSpacing: '.3px' }}>{p.sub}</p>
          </div>
        ))}

        <div style={{ fontSize: '10px', color: C.yellow, padding: '10px 12px', border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.yellow}`, borderRadius: '2px', lineHeight: 1.7, background: 'rgba(255,194,51,.04)', marginTop: '4px' }}>
          <span style={{ fontWeight: 700 }}>Tip</span> — Always start with <span style={{ color: C.green, fontWeight: 700 }}>Upgrade VPN</span>. It removes the most risk (−45%) for the price, on every node.
        </div>

        <button onClick={onClose} style={{ marginTop: '16px', width: '100%', border: `1px solid ${C.green}`, background: 'rgba(77,255,114,.06)', color: C.green, fontSize: '12px', fontWeight: 700, padding: '11px', cursor: 'pointer', letterSpacing: '1px', borderRadius: '3px' }}>
          GOT IT
        </button>
      </div>
    </div>
  );
}
