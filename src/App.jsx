import { useState, useEffect, useRef, useCallback } from 'react';
import { C, EVENTS, PATCHES, DIFFICULTY, initNodes } from './gameData.js';
import TopBar from './components/TopBar.jsx';
import NetworkMap from './components/NetworkMap.jsx';
import SitePanel from './components/SitePanel.jsx';
import LogPanel from './components/LogPanel.jsx';
import EventModal from './components/EventModal.jsx';
import IntroScreen from './components/IntroScreen.jsx';
import BriefingScreen from './components/BriefingScreen.jsx';
import WinScreen from './components/WinScreen.jsx';
import LoseScreen from './components/LoseScreen.jsx';
import PatchGuide from './components/PatchGuide.jsx';
import Walkthrough from './components/Walkthrough.jsx';

export default function App() {
  const [phase, setPhase] = useState('intro');
  const [nodes, setNodes] = useState(initNodes);
  const [tokens, setTokens] = useState(DIFFICULTY.startTokens);
  const [harvest, setHarvest] = useState(0);
  const [harvestPeak, setHarvestPeak] = useState(0);
  const [score, setScore] = useState(1000);
  const [selected, setSelected] = useState(null);
  const [logs, setLogs] = useState([{ t: '[SYSTEM] KGRN network monitor online. All nodes vulnerable.', c: C.dim }]);
  const [event, setEvent] = useState(null);
  const [boostNode, setBoostNode] = useState(null);
  const [boostTimer, setBoostTimer] = useState(0);
  const [discountNode, setDiscountNode] = useState(null);
  const [eventActive, setEventActive] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [firstPatchDone, setFirstPatchDone] = useState(false);
  const usedEvents = useRef(new Set());

  // section anchors for the guided tour spotlight
  const meterRef = useRef(null);
  const mapRef = useRef(null);
  const panelRef = useRef(null);
  const logRef = useRef(null);

  // Freeze the harvest while the player is reading anything modal — the tour,
  // the fixes guide, or an alert. Reading should never cost you time.
  const paused = showTour || showGuide || eventActive;
  const stateRef = useRef({});
  stateRef.current = { nodes, tokens, harvest, score, boostNode, boostTimer, discountNode, eventActive, phase, paused };

  const addLog = useCallback((t, c = C.text) => {
    setLogs((prev) => [{ t, c }, ...prev.slice(0, 24)]);
  }, []);

  useEffect(() => {
    if (phase !== 'game') return;
    const tick = setInterval(() => {
      const s = stateRef.current;
      if (s.paused) return; // freeze harvest during tour / guide
      let rate = 0;
      s.nodes.forEach((n) => {
        let r = n.rate * (n.risk / 100) * DIFFICULTY.harvestMult;
        if (s.boostNode === n.id) r *= 2;
        rate += r;
      });
      let nbt = s.boostTimer;
      if (nbt > 0) {
        nbt--;
        if (nbt === 0) {
          setBoostNode(null);
          addLog('[SYSTEM] Clockbreaker boost expired.', C.yellow);
        }
        setBoostTimer(nbt);
      }
      setHarvest((prev) => {
        const next = Math.min(100, prev + rate);
        setHarvestPeak((p) => Math.max(p, next));
        if (next >= 100) setPhase('lose');
        return next;
      });
      setScore((p) => Math.max(0, p - Math.floor(rate * 2)));
      if (s.nodes.every((n) => n.risk <= 0)) setPhase('win');
    }, DIFFICULTY.tickMs);

    const evTick = setInterval(() => {
      const s = stateRef.current;
      if (s.paused || s.eventActive || s.phase !== 'game') return;
      const pool = EVENTS.filter((e) => !usedEvents.current.has(e.id));
      if (!pool.length) return;
      const e = pool[Math.floor(Math.random() * pool.length)];
      usedEvents.current.add(e.id);
      setEvent(e);
      setEventActive(true);
    }, DIFFICULTY.eventEveryMs);

    return () => {
      clearInterval(tick);
      clearInterval(evTick);
    };
  }, [phase, addLog]);

  function resolveEvent(e) {
    if (e.effect === 'boost') {
      setBoostNode(e.node);
      setBoostTimer(DIFFICULTY.boostTicks);
      addLog(`[ALERT] Clockbreakers boosting ${e.node}!`, C.red);
    } else if (e.effect === 'discount') {
      setDiscountNode(e.node);
      addLog('[INTEL] Stormline VPN discounted 1 token.', C.yellow);
    } else if (e.effect === 'qkd') {
      setScore((p) => p + 150);
      addLog('[QKD] Quantum link installed. +150 score!', C.cyan);
    } else if (e.effect === 'check') {
      const n = stateRef.current.nodes.find((x) => x.id === e.node);
      if (n?.patches.cert) {
        setScore((p) => p + 75);
        addLog('[SECURE] ML-DSA blocked forgery! +75 score.', C.green);
      } else {
        addLog('[WARNING] Aurora cert not patched!', C.red);
      }
    } else {
      addLog(`[ALERT] ${e.node.toUpperCase()} needs attention.`, C.red);
    }
    setEvent(null);
    setEventActive(false);
  }

  function applyPatch(nodeId, patchId) {
    const patch = PATCHES.find((p) => p.id === patchId);
    const node = nodes.find((n) => n.id === nodeId);
    if (!patch || !node || node.patches[patchId]) return;
    let cost = patch.cost;
    if (patchId === 'vpn' && discountNode === nodeId) {
      cost = Math.max(1, cost - 1);
      setDiscountNode(null);
    }
    if (tokens < cost) {
      addLog('[ERROR] Not enough tokens for this fix.', C.red);
      return;
    }
    setFirstPatchDone(true);
    setTokens((p) => p - cost);
    setScore((p) => p + 80);
    setNodes((prev) => prev.map((n) => {
      if (n.id !== nodeId) return n;
      return { ...n, risk: Math.max(0, n.risk - patch.dr), patches: { ...n.patches, [patchId]: true } };
    }));
    addLog(`[PATCH] ${node.full}: ${patch.label} applied.`, C.green);
    if (Math.max(0, node.risk - patch.dr) <= 0) addLog(`[SECURE] ${node.name} fully secured!`, C.green);
  }

  function startGame() {
    setPhase('game');
    setNodes(initNodes());
    setTokens(DIFFICULTY.startTokens);
    setHarvest(0);
    setHarvestPeak(0);
    setScore(1000);
    setSelected(null);
    setLogs([
      { t: '[SYSTEM] Mission started. Clockbreakers harvesting.', c: C.red },
      { t: '[TIP] Fix the red #1 nodes first — start with Upgrade VPN.', c: C.cyan },
    ]);
    setBoostNode(null);
    setBoostTimer(0);
    setDiscountNode(null);
    setEventActive(false);
    setEvent(null);
    setFirstPatchDone(false);
    setShowGuide(false);
    setShowTour(true); // guided tour on every fresh start; timer frozen until closed
    usedEvents.current = new Set();
  }

  const selNode = nodes.find((n) => n.id === selected) || null;
  // until the first fix lands, nudge toward the most urgent unsecured node
  const hintId = !firstPatchDone
    ? [...nodes].filter((n) => n.risk > 0).sort((a, b) => a.priority - b.priority)[0]?.id
    : null;

  const headerBtn = {
    border: `1px solid ${C.border}`, background: 'transparent', color: C.dim,
    fontSize: '10px', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px', letterSpacing: '.5px',
  };

  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.green }}>
      {phase === 'intro' && <IntroScreen onStart={() => setPhase('brief')} onGuide={() => setShowGuide(true)} />}
      {phase === 'brief' && <BriefingScreen onStart={startGame} onGuide={() => setShowGuide(true)} />}
      {phase === 'game' && (
        <div style={{ padding: '14px 12px', maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 2px', gap: '8px' }}>
            <span className="glow" style={{ fontSize: '12px', color: C.green, letterSpacing: '3px', fontWeight: 700 }}>TIMELOCKQ</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setShowGuide(true)} style={headerBtn} aria-label="Open the fixes guide">? Guide</button>
              <button onClick={() => setShowTour(true)} style={headerBtn} aria-label="Replay the walkthrough">↺ Tour</button>
            </div>
          </div>
          <div ref={meterRef}>
            <TopBar tokens={tokens} harvest={harvest} secured={nodes.filter((n) => n.risk <= 0).length} score={score} />
          </div>
          <div className="tq-game-grid">
            <div ref={mapRef}>
              <NetworkMap nodes={nodes} selected={selected} onSelect={setSelected} boostNode={boostNode} hintId={hintId} />
            </div>
            <div ref={panelRef} style={{ display: 'flex' }}>
              <SitePanel node={selNode} tokens={tokens} onPatch={applyPatch} discountNode={discountNode} onGuide={() => setShowGuide(true)} />
            </div>
          </div>
          <div ref={logRef}>
            <LogPanel logs={logs} />
          </div>
          <EventModal event={event} onResolve={() => resolveEvent(event)} onDismiss={() => { setEvent(null); setEventActive(false); }} />
          {showTour && <Walkthrough refs={{ meter: meterRef, map: mapRef, panel: panelRef, log: logRef }} onClose={() => setShowTour(false)} />}
        </div>
      )}
      {phase === 'win' && <WinScreen score={score + tokens * 50} tokens={tokens} harvestPeak={harvestPeak} onRestart={() => setPhase('intro')} />}
      {phase === 'lose' && <LoseScreen nodes={nodes} onRestart={() => setPhase('intro')} />}

      {showGuide && <PatchGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
}
