import { C } from '../gameData.js';

export default function LoseScreen({ nodes, onRestart }) {
  const tips = [];
  const unp = nodes.filter((n) => !n.patches.vpn);
  if (unp.length) tips.push(`VPN not upgraded on: ${unp.map((n) => n.name).join(', ')} — biggest HNDL risk`);
  if (!nodes.find((n) => n.id === 'meridian')?.patches.vpn) tips.push('Meridian should be priority #1 — most sensitive node');
  if (!nodes.find((n) => n.id === 'stormline')?.patches.zt) tips.push('Stormline needs Zero Trust — roams on public internet');
  if (!nodes.find((n) => n.id === 'hq')?.patches.vpn) tips.push('HQ VPN must be upgraded first — all traffic routes here');
  tips.push('Strategy: VPN upgrade gives −45% risk — always apply it first per node');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px 20px', textAlign: 'center' }}>
      <div className="blink glow-red" style={{ fontSize: '24px', color: C.red, letterSpacing: '3px', fontWeight: 800, marginBottom: '4px' }}>▸ TIMELINE COMPROMISED</div>
      <div style={{ fontSize: '10px', color: '#8a4a52', letterSpacing: '2px', marginBottom: '16px' }}>QUANTUM APOCALYPSE INITIATED</div>

      <div className="tq-panel" style={{ padding: '18px 20px', maxWidth: '520px', width: '100%', margin: '0 auto', borderColor: '#4a1a24', borderRadius: '4px' }}>
        <p style={{ fontSize: '11px', color: '#ff8a9a', lineHeight: 1.9, marginBottom: '16px' }}>
          The Clockbreakers harvested enough KGRN data.<br />
          In 2065, quantum computers decrypt every captured packet.<br />
          Research data, agent identities, mission intel — all <span className="glow-red" style={{ color: C.red, fontWeight: 700 }}>exposed</span>.
        </p>

        <div style={{ textAlign: 'left', border: '1px solid #4a1a24', borderRadius: '3px', padding: '12px' }}>
          <div style={{ fontSize: '9px', color: '#8a4a52', letterSpacing: '1px', marginBottom: '8px' }}>WHAT WENT WRONG</div>
          {tips.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '7px', fontSize: '10px', lineHeight: 1.6, color: C.yellow, padding: '3px 0' }}>
              <span style={{ color: C.red }}>›</span><span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onRestart} style={{ marginTop: '20px', border: `1px solid ${C.red}`, background: 'rgba(255,84,112,.06)', color: C.red, fontSize: '13px', fontWeight: 700, padding: '13px 34px', cursor: 'pointer', letterSpacing: '2px', borderRadius: '3px' }}>▸ TRY AGAIN</button>
    </div>
  );
}
