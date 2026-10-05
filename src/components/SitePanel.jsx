import { C, PATCHES, riskColor, riskLabel } from '../gameData.js';

export default function SitePanel({ node, tokens, onPatch, discountNode, onGuide }) {
  if (!node) {
    return (
      <div className="tq-panel" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', minHeight: '260px' }}>
        <div className="blink" style={{ fontSize: '26px', color: C.borderBright, marginBottom: '10px' }}>▮</div>
        <p style={{ color: C.dim, fontSize: '11px', textAlign: 'center', lineHeight: 1.9 }}>
          <span style={{ color: C.greenSoft }}>Select a node</span> on the map<br />to inspect its vulnerabilities<br />and deploy post-quantum patches.
        </p>
      </div>
    );
  }
  const rc = riskColor(node.risk);
  const applied = PATCHES.filter((p) => node.patches[p.id]).length;

  return (
    <div className="tq-panel fade-in" style={{ padding: '13px', flex: 1, overflowY: 'auto', borderRadius: '3px' }}>
      <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: '10px', marginBottom: '11px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '9px', color: C.dim, letterSpacing: '2px' }}>SELECTED NODE</div>
            <div className="glow" style={{ fontSize: '14px', color: C.cyan, fontWeight: 700, margin: '3px 0' }}>{node.full.toUpperCase()}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '9px', color: C.dim }}>VULNERABILITY</div>
            <div className="glow" style={{ fontSize: '22px', color: rc, fontWeight: 800, lineHeight: 1 }}>{node.risk}%</div>
          </div>
        </div>

        {/* risk bar */}
        <div style={{ height: '5px', background: '#060906', border: `1px solid ${C.border}`, borderRadius: '2px', margin: '8px 0', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${node.risk}%`, background: rc, boxShadow: `0 0 8px ${rc}`, transition: 'width .4s ease' }} />
        </div>

        <p style={{ fontSize: '10px', color: C.text, lineHeight: 1.65 }}>{node.desc}</p>
        <div style={{ display: 'flex', gap: '14px', marginTop: '7px', fontSize: '9px', flexWrap: 'wrap' }}>
          <span style={{ color: C.dim }}>RATE <span style={{ color: C.red }}>{(node.rate * (node.risk / 100) * 0.35).toFixed(2)}/tick</span></span>
          <span style={{ color: C.dim }}>STATUS <span style={{ color: rc }}>{riskLabel(node.risk)}</span></span>
          <span style={{ color: C.dim }}>PATCHES <span style={{ color: C.greenSoft }}>{applied}/4</span></span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', color: C.dim, letterSpacing: '1px', marginBottom: '9px' }}>
        <button onClick={onGuide} style={{ border: 'none', background: 'transparent', color: C.cyan, fontSize: '9px', letterSpacing: '1px', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
          AVAILABLE FIXES · WHAT DO THESE DO?
        </button>
        <span>BUDGET <span style={{ color: C.cyan }}>{tokens}t</span></span>
      </div>

      {PATCHES.map((p) => {
        const done = node.patches[p.id];
        const discounted = p.id === 'vpn' && discountNode === node.id;
        const cost = discounted ? Math.max(1, p.cost - 1) : p.cost;
        const cantAfford = tokens < cost && !done;
        const disabled = done || cantAfford;
        const accent = done ? C.dim : cantAfford ? '#5c2030' : p.color;
        return (
          <div key={p.id} style={{ marginBottom: '7px' }}>
            <button
              onClick={() => !disabled && onPatch(node.id, p.id)}
              disabled={disabled}
              aria-label={`${p.label}, ${p.sub}, ${done ? 'applied' : cantAfford ? 'not enough tokens' : `costs ${cost} tokens`}`}
              style={{
                display: 'block', width: '100%',
                background: done ? 'rgba(77,255,114,.06)' : 'transparent',
                border: `1px solid ${done ? C.border : accent}`,
                borderLeft: `3px solid ${accent}`,
                color: accent,
                fontFamily: 'var(--font)', fontSize: '11px', padding: '9px 11px',
                cursor: disabled ? 'not-allowed' : 'pointer', textAlign: 'left',
                borderRadius: '2px', opacity: cantAfford ? 0.65 : 1,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontWeight: 700 }}>
                  {p.label}
                  {p.id === 'vpn' && !done && <span style={{ marginLeft: '7px', fontSize: '8px', color: C.green, border: `1px solid ${C.green}`, borderRadius: '2px', padding: '1px 4px', letterSpacing: '.5px', verticalAlign: 'middle' }}>DO FIRST</span>}
                </span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: done ? C.dim : cantAfford ? '#5c2030' : C.yellow, whiteSpace: 'nowrap' }}>
                  {done ? '✓ APPLIED' : discounted ? `${cost}t · SAVE 1` : `${cost}t · −${p.dr}%`}
                </span>
              </div>
              <span style={{ color: C.dim, fontSize: '9px' }}>{p.sub}</span>
            </button>
            {!done && <p style={{ fontSize: '9px', color: C.dim, opacity: 0.85, padding: '3px 0 0 4px', lineHeight: 1.5 }}>{p.plain}</p>}
          </div>
        );
      })}
    </div>
  );
}
