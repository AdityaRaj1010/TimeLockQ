import { C } from '../gameData.js';

const LESSONS = [
  ['HNDL', 'Traffic recorded in 2026 quantum-decrypted in 2065 — happening right now'],
  ['ML-KEM', 'Replaces Diffie-Hellman for quantum-safe VPN key exchange (CRYSTALS-Kyber)'],
  ['ML-DSA', 'Replaces RSA/ECC for quantum-safe digital signatures (CRYSTALS-Dilithium)'],
  ['Zero Trust', 'Continuous identity verification — not just perimeter defense'],
  ['Hybrid mode', 'Old + new crypto together during migration = zero downtime'],
];

export default function WinScreen({ score, tokens, harvestPeak, onRestart }) {
  const stats = [['FINAL SCORE', score, C.green], ['TOKENS LEFT', tokens, C.cyan], ['PEAK HARVEST', `${Math.floor(harvestPeak)}%`, C.red]];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px 20px', textAlign: 'center' }}>
      <div className="glow fade-in" style={{ fontSize: '24px', color: C.green, letterSpacing: '3px', fontWeight: 800, marginBottom: '4px' }}>▸ TIMELINE SECURED</div>
      <div style={{ fontSize: '10px', color: C.dim, letterSpacing: '2px', marginBottom: '16px' }}>MISSION COMPLETE</div>

      <div className="tq-panel" style={{ padding: '18px 20px', maxWidth: '520px', width: '100%', margin: '0 auto', borderRadius: '4px' }}>
        <p style={{ fontSize: '11px', color: C.text, lineHeight: 1.9, marginBottom: '16px' }}>
          All KGRN nodes migrated to Post-Quantum Cryptography.<br />
          The Clockbreakers' harvested data is now <span className="glow" style={{ color: C.green, fontWeight: 700 }}>permanently worthless</span>.<br />
          Director Voss congratulates Project TimeLock-Q.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
          {stats.map(([l, v, c]) => (
            <div key={l} style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: '3px', padding: '10px 4px' }}>
              <div style={{ fontSize: '8px', color: C.dim, letterSpacing: '1px', marginBottom: '4px' }}>{l}</div>
              <div className="glow" style={{ fontSize: '22px', color: c, fontWeight: 800 }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'left', border: `1px solid ${C.border}`, borderRadius: '3px', padding: '12px' }}>
          <div style={{ fontSize: '9px', color: C.dim, letterSpacing: '1px', marginBottom: '8px' }}>WHAT YOU LEARNED</div>
          {LESSONS.map(([k, v]) => (
            <div key={k} style={{ fontSize: '10px', lineHeight: 1.75, color: C.text, padding: '2px 0' }}>
              <span style={{ color: C.cyan, fontWeight: 700 }}>{k}</span> — {v}
            </div>
          ))}
        </div>
      </div>

      <button onClick={onRestart} style={{ marginTop: '20px', border: `1px solid ${C.green}`, background: 'rgba(77,255,114,.06)', color: C.green, fontSize: '13px', fontWeight: 700, padding: '13px 34px', cursor: 'pointer', letterSpacing: '2px', borderRadius: '3px' }}>▸ PLAY AGAIN</button>
    </div>
  );
}
