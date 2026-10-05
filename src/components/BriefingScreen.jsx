import { C, PATCHES } from '../gameData.js';

const THREATS = [
  { c: C.red,    t: 'CRITICAL', m: "IPSec VPNs use Diffie-Hellman — breakable by Shor's algorithm. Prime HNDL target." },
  { c: C.red,    t: 'CRITICAL', m: 'AnyConnect VPN uses RSA/TLS — all remote sessions exposed to harvest.' },
  { c: C.red,    t: 'CRITICAL', m: 'X.509 certs use RSA/ECC — entire PKI trust chain breakable.' },
  { c: C.yellow, t: 'HIGH',     m: 'SSH host keys on routers use RSA/ECDSA — management plane takeover risk.' },
  { c: C.yellow, t: 'HIGH',     m: 'Cloud connections (AWS/Azure) use classical TLS — data at rest harvested.' },
  { c: C.yellow, t: 'HIGH',     m: 'Stormline Mobile roams public internet — highest per-node exposure.' },
];

export default function BriefingScreen({ onStart, onGuide }) {
  return (
    <div style={{ padding: '24px 16px', maxWidth: '700px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ fontSize: '9px', color: C.dim, letterSpacing: '2px', marginBottom: '4px' }}>MISSION BRIEFING</div>
      <div className="glow" style={{ fontSize: '15px', color: C.green, fontWeight: 800, letterSpacing: '1px', marginBottom: '14px' }}>KGRN THREAT ANALYSIS</div>

      <div className="tq-panel" style={{ padding: '12px 14px', marginBottom: '12px', borderRadius: '3px' }}>
        {THREATS.map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: '9px', fontSize: '10px', lineHeight: 1.5, color: C.text, padding: '4px 0', borderBottom: i < THREATS.length - 1 ? `1px solid ${C.border}` : 'none' }}>
            <span style={{ color: t.c, fontWeight: 700, minWidth: '58px', letterSpacing: '.5px' }}>[{t.t}]</span>
            <span>{t.m}</span>
          </div>
        ))}
      </div>

      <div className="tq-panel" style={{ padding: '12px 14px', marginBottom: '12px', borderRadius: '3px' }}>
        <div style={{ fontSize: '9px', color: C.dim, letterSpacing: '1px', marginBottom: '9px' }}>PATCH OPERATIONS AVAILABLE</div>
        {PATCHES.map((p) => (
          <div key={p.id} style={{ display: 'flex', gap: '9px', fontSize: '10px', lineHeight: 1.5, padding: '5px 0', borderTop: `1px solid ${C.border}` }}>
            <span style={{ color: p.color, fontWeight: 700, minWidth: '96px', whiteSpace: 'nowrap' }}>
              <span style={{ color: C.yellow }}>{p.cost}t</span> {p.label}
            </span>
            <span style={{ color: C.dim }}>{p.desc}</span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '10px', color: C.yellow, marginBottom: '18px', padding: '11px 13px', border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.yellow}`, borderRadius: '2px', lineHeight: 1.8, background: 'rgba(255,194,51,.04)' }}>
        <span style={{ fontWeight: 700 }}>⚡ STRATEGY</span> — Upgrade VPN first (−45% risk, biggest impact per token). Meridian Quantum Lab is priority #1: the most sensitive node in KGRN.
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
        <button onClick={onStart} style={{ border: `1px solid ${C.green}`, background: 'rgba(77,255,114,.06)', color: C.green, fontSize: '13px', fontWeight: 700, padding: '12px 30px', cursor: 'pointer', letterSpacing: '2px', borderRadius: '3px' }}>
          ▸ ENTER KGRN NETWORK
        </button>
        <button onClick={onGuide} style={{ border: 'none', background: 'transparent', color: C.cyan, fontSize: '11px', cursor: 'pointer', letterSpacing: '.5px', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          How the 4 fixes work →
        </button>
      </div>
    </div>
  );
}
