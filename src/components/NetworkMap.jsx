import { useRef, useState } from 'react';
import { C, EDGES, PATCHES, riskColor, riskLabel } from '../gameData.js';

const R_GAUGE = 7.4;
const CIRC = 2 * Math.PI * R_GAUGE;

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
}

function priorityColor(p) {
  if (p <= 2) return C.red;
  if (p <= 4) return C.yellow;
  return C.dim;
}

export default function NetworkMap({ nodes, selected, onSelect, boostNode, hintId }) {
  const wrapRef = useRef(null);
  const [hover, setHover] = useState(null); // { node, left, top }

  const enter = (node) => (e) => {
    const wrap = wrapRef.current?.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    if (!wrap) return;
    setHover({ node, left: r.left + r.width / 2 - wrap.left, top: r.top - wrap.top });
  };

  return (
    <div ref={wrapRef} className="tq-panel" style={{ padding: '10px', borderRadius: '3px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
        <div style={{ fontSize: '9px', color: C.dim, letterSpacing: '2px' }}>KGRN NETWORK MAP</div>
        <div style={{ fontSize: '9px', color: C.borderBright, letterSpacing: '1px' }}>2026 · LIVE</div>
      </div>

      <svg viewBox="0 0 100 100" style={{ width: '100%', maxHeight: '300px', display: 'block' }}>
        {/* links */}
        {EDGES.map(([a, b]) => {
          const na = nodes.find((n) => n.id === a);
          const nb = nodes.find((n) => n.id === b);
          const sec = na.risk <= 0 && nb.risk <= 0;
          const col = sec ? C.green : riskColor(Math.max(na.risk, nb.risk));
          return (
            <g key={`${a}-${b}`}>
              <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={C.border} strokeWidth="0.9" opacity="0.7" />
              <line
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={col} strokeWidth="0.5" opacity={sec ? 0.9 : 0.8}
                className={sec ? undefined : 'tq-flow'}
              />
            </g>
          );
        })}

        {/* stations */}
        {nodes.map((n) => {
          const rc = riskColor(n.risk);
          const isSel = selected === n.id;
          const isBoosted = boostNode === n.id;
          const done = n.risk <= 0;
          const isHint = hintId === n.id;
          const arc = (Math.max(0, n.risk) / 100) * CIRC;

          return (
            <g key={n.id} className="tq-node" onClick={() => onSelect(n.id)} onMouseEnter={enter(n)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
              {/* generous invisible hit area */}
              <circle cx={n.x} cy={n.y} r="10" fill="transparent" />

              {isHint && !done && <circle cx={n.x} cy={n.y} r="10.5" fill="none" stroke={C.cyan} strokeWidth="0.6" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'ringPulse 1.6s ease-in-out infinite' }} />}
              {isBoosted && <circle cx={n.x} cy={n.y} r="10" fill="none" stroke={C.red} strokeWidth="0.7" className="pulse" />}
              {isSel && <circle cx={n.x} cy={n.y} r="9.4" fill="none" stroke={C.cyan} strokeWidth="0.8" strokeDasharray="1.4,1" />}

              {/* risk gauge: dim track + colored remaining-risk arc */}
              <circle cx={n.x} cy={n.y} r={R_GAUGE} fill="none" stroke={C.border} strokeWidth="1.5" />
              {!done && (
                <circle
                  cx={n.x} cy={n.y} r={R_GAUGE} fill="none" stroke={rc} strokeWidth="1.5" strokeLinecap="round"
                  strokeDasharray={`${arc.toFixed(2)} ${(CIRC - arc).toFixed(2)}`}
                  transform={`rotate(-90 ${n.x} ${n.y})`}
                  style={{ transition: 'stroke-dasharray .4s ease' }}
                />
              )}
              {done && <circle cx={n.x} cy={n.y} r={R_GAUGE} fill="none" stroke={C.green} strokeWidth="1.5" />}

              {/* hex body */}
              <polygon className="tq-node-hex" points={hexPoints(n.x, n.y, 5)} fill={done ? '#06210e' : '#150a0c'} stroke={rc} strokeWidth="0.5" style={{ color: rc }} />
              <text x={n.x} y={n.y + 1.4} textAnchor="middle" fontSize="4" fill={rc} fontWeight="bold">{done ? '✓' : n.icon}</text>

              {/* name below */}
              <text x={n.x} y={n.y + 11.4} textAnchor="middle" fontSize="2.6" fill={done ? C.green : C.greenSoft} fontWeight="bold" fontFamily="var(--font)">{n.name}</text>

              {/* priority badge (top-right) — always visible so ranking is clear from the start */}
              <g transform={`translate(${n.x + 5.4} ${n.y - 5.4})`}>
                <circle r="2.4" fill="#050b06" stroke={done ? C.green : priorityColor(n.priority)} strokeWidth="0.5" />
                <text y="0.9" textAnchor="middle" fontSize="2.6" fontWeight="bold" fill={done ? C.green : priorityColor(n.priority)} fontFamily="var(--font)">{n.priority}</text>
              </g>

              {/* patch chips */}
              {PATCHES.map((p, i) => (
                <rect key={p.id} x={n.x - 3.6 + i * 2.05} y={n.y + 12.6} width="1.6" height="1.6" rx="0.35"
                  fill={n.patches[p.id] ? p.color : '#0a1e0e'} stroke={n.patches[p.id] ? p.color : C.border} strokeWidth="0.25" />
              ))}
            </g>
          );
        })}
      </svg>

      {/* hover tooltip */}
      {hover && (
        <div className="pop-in" style={{
          position: 'absolute', left: hover.left, top: hover.top - 8, transform: 'translate(-50%,-100%)',
          zIndex: 20, pointerEvents: 'none', width: '190px',
          background: 'linear-gradient(180deg,#0d180d,#0a130a)', border: `1px solid ${riskColor(hover.node.risk)}`,
          borderRadius: '4px', padding: '9px 11px', boxShadow: '0 8px 24px rgba(0,0,0,.6)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', color: C.cyan, fontWeight: 700 }}>{hover.node.full}</span>
            <span style={{ fontSize: '8px', color: priorityColor(hover.node.priority), fontWeight: 700, whiteSpace: 'nowrap' }}>#{hover.node.priority} PRIORITY</span>
          </div>
          <div style={{ fontSize: '8px', color: C.dim, letterSpacing: '1px', marginBottom: '5px' }}>{hover.node.kind.toUpperCase()}</div>
          <p style={{ fontSize: '10px', color: C.greenSoft, lineHeight: 1.55, marginBottom: '6px' }}>{hover.node.plain}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: C.dim }}>
            <span>STATUS <span style={{ color: riskColor(hover.node.risk) }}>{riskLabel(hover.node.risk)}</span></span>
            <span>PATCHED <span style={{ color: C.greenSoft }}>{PATCHES.filter((p) => hover.node.patches[p.id]).length}/4</span></span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '8px', color: C.dim, marginTop: '6px' }}>
        {[['CRITICAL', C.red], ['AT RISK', C.orange], ['LOW', C.yellow], ['SECURED', C.green]].map(([l, c]) => (
          <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: c, boxShadow: `0 0 5px ${c}` }} />{l}
          </span>
        ))}
      </div>
      <div style={{ fontSize: '9px', color: C.dim, textAlign: 'center', marginTop: '3px' }}>
        Ring = risk left · badge = fix-first order · hover for details
      </div>
    </div>
  );
}
