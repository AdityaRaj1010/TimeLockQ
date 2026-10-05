import { C } from '../gameData.js';

const BANNER = ` ██████ ██████  ██    ██ ██████  ████████  ██████
██      ██   ██  ██  ██  ██   ██    ██    ██    ██
██      ██████    ████   ██████     ██    ██    ██
██      ██   ██    ██    ██         ██    ██    ██
 ██████ ██   ██    ██    ██         ██     ██████  `;

export default function IntroScreen({ onStart, onGuide }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px 20px', textAlign: 'center' }}>
      <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '10px' }}>
        <pre className="glow fade-in" style={{ fontSize: 'clamp(7px, 2.1vw, 11px)', lineHeight: 1.3, color: C.green, whiteSpace: 'pre', overflowX: 'auto' }}>{BANNER}</pre>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent, ${C.green}22, transparent)`, height: '30%', animation: 'scanSweep 4s ease-in-out infinite', pointerEvents: 'none' }} />
      </div>
      <div style={{ fontSize: '9px', color: C.dim, letterSpacing: '4px', marginBottom: '18px' }}>L O C K &nbsp; T E R M I N A L &nbsp; · &nbsp; v 2 . 2 6</div>

      <div className="tq-panel" style={{ padding: '20px 22px', maxWidth: '500px', width: '100%', margin: '0 auto 20px', borderRadius: '4px', borderColor: C.border }}>
        <div style={{ fontSize: '12px', color: C.yellow, letterSpacing: '1.5px', marginBottom: '14px', fontWeight: 700 }}>PROJECT TIMELOCKQ — KGRN NETWORK DEFENSE</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', fontSize: '10px', marginBottom: '14px', color: C.dim, letterSpacing: '1px' }}>
          <span>YEAR <span style={{ color: C.greenSoft }}>2026</span></span>
          <span>STATUS <span className="blink glow-red" style={{ color: C.red, fontWeight: 700 }}>THREAT DETECTED</span></span>
        </div>
        <p style={{ fontSize: '11px', color: C.text, lineHeight: 2 }}>
          The Clockbreakers have arrived from 2065.<br />
          They are harvesting KGRN encrypted traffic <span className="glow-red" style={{ color: C.red, fontWeight: 700 }}>right now</span>.<br />
          Every RSA-encrypted packet captured today<br />
          will be quantum-decrypted in 2065.
        </p>
        <div style={{ borderTop: `1px solid ${C.border}`, margin: '14px 0 0', paddingTop: '12px', fontSize: '11px', color: C.greenSoft, lineHeight: 1.9 }}>
          <span style={{ color: C.cyan, fontWeight: 700 }}>YOUR MISSION</span> — patch every node to post-quantum crypto and stop the harvest before the meter hits 100%.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <button onClick={onStart} style={{ border: `1px solid ${C.green}`, background: 'rgba(77,255,114,.06)', color: C.green, fontSize: '13px', fontWeight: 700, padding: '13px 34px', cursor: 'pointer', letterSpacing: '2px', borderRadius: '3px' }}>
          ▸ ACCEPT MISSION
        </button>
        <button onClick={onGuide} style={{ border: 'none', background: 'transparent', color: C.cyan, fontSize: '11px', cursor: 'pointer', letterSpacing: '.5px', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          New to this? Read how the 4 fixes work →
        </button>
      </div>
      <p style={{ fontSize: '8px', color: C.dim, marginTop: '18px', letterSpacing: '1px', maxWidth: '420px', lineHeight: 1.6 }}>CODE WITH CISCO — PROBLEM STATEMENT 3: ZERO-TRUST + POST-QUANTUM RESILIENT EDGE</p>
    </div>
  );
}
