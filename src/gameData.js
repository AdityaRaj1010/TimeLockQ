// Difficulty — tuned gentle so first-timers can read & learn without losing fast.
export const DIFFICULTY = {
  tickMs: 1000,        // harvest advances once per second
  harvestMult: 0.10,   // lower = slower harvest (original prototype was 0.35)
  startTokens: 40,
  eventEveryMs: 30000, // seconds between random events
  boostTicks: 15,
};

// priority 1 = fix first. icon = single glyph shown inside the station.
// plain = one-line, non-technical "why it matters".
export const NODES = [
  { id: 'hq',        name: 'HQ',       full: 'Headquarters',         icon: '★', priority: 3, kind: 'Central hub',
    plain: 'Every site talks to HQ. If it leaks, everything downstream leaks too.',
    desc: 'Main data center. All inter-site traffic routes here. Critical hub for all KGRN operations.', x: 50, y: 50, rate: 0.8 },
  { id: 'aurora',    name: 'Aurora',   full: 'Aurora Research',      icon: '◆', priority: 5, kind: 'Research site',
    plain: 'Experimental research data — valuable, but shielded behind HQ.',
    desc: 'Primary research site. Sensitive experimental data flows to HQ via MPLS and IPSec VPN.', x: 22, y: 26, rate: 1.2 },
  { id: 'meridian',  name: 'Meridian', full: 'Meridian Quantum Lab', icon: '⬡', priority: 1, kind: 'Quantum lab',
    plain: 'The crown jewels. Most sensitive data in KGRN — fix this one first.',
    desc: 'Quantum lab. MOST sensitive data in KGRN. Clockbreaker priority target. Upgrade first.', x: 78, y: 24, rate: 1.5 },
  { id: 'helix',     name: 'Helix',    full: 'Helix Genetics',       icon: '❋', priority: 6, kind: 'Genetics lab',
    plain: 'Genetic data stays secret for decades — perfect for "harvest now, crack later".',
    desc: 'Genetics research. Data has decades-long sensitivity. High Harvest-Now-Decrypt-Later risk.', x: 22, y: 76, rate: 1.0 },
  { id: 'horizon',   name: 'Horizon',  full: 'Horizon Defense',      icon: '⬢', priority: 4, kind: 'Defense center',
    plain: 'Live defense comms. Interception here is an operational emergency.',
    desc: 'Defense monitoring center. Mission-critical comms and operational intelligence feeds.', x: 78, y: 76, rate: 1.3 },
  { id: 'stormline', name: 'Storm',    full: 'Stormline Mobile',     icon: '▲', priority: 2, kind: 'Mobile unit',
    plain: 'Roams the open internet with no private line — the most exposed node.',
    desc: 'Mobile command unit. Roams on public internet. No private MPLS. Most exposed node.', x: 50, y: 88, rate: 1.8 },
];

export const EDGES = [
  ['hq', 'aurora'], ['hq', 'meridian'], ['hq', 'helix'], ['hq', 'horizon'],
  ['hq', 'stormline'], ['aurora', 'meridian'], ['helix', 'horizon'],
];

// `plain` = jargon-free explanation. `analogy` = everyday comparison for non-tech players.
export const PATCHES = [
  { id: 'vpn',   label: 'Upgrade VPN',   sub: 'Diffie-Hellman → ML-KEM', cost: 2, dr: 45, color: '#4dff72',
    plain: 'Locks the private tunnels between sites with quantum-proof keys.',
    analogy: 'Like swapping a lock a future thief already has the key to, for one they never will.',
    desc: 'Eliminates HNDL risk. Replaces breakable DH key exchange with quantum-safe ML-KEM (Kyber).' },
  { id: 'cert',  label: 'Replace Certs', sub: 'RSA/ECC → ML-DSA',        cost: 1, dr: 20, color: '#46d9ff',
    plain: 'Replaces the ID badges that prove a server is who it claims to be.',
    analogy: 'Like a passport that can\'t be forged, even by a quantum computer.',
    desc: 'Swaps X.509 RSA certs for ML-DSA (Dilithium). Blocks quantum certificate forgery.' },
  { id: 'zt',    label: 'Zero Trust',    sub: 'Perimeter → Cisco ISE+',  cost: 2, dr: 20, color: '#ffc233',
    plain: 'Stops trusting anyone by default — every request is re-checked.',
    analogy: 'Like showing your badge at every door, not just the front gate.',
    desc: 'Extends Cisco ISE for continuous verification and TrustSec micro-segmentation.' },
  { id: 'cloud', label: 'Fix Cloud',     sub: 'Classic TLS → PQC TLS',   cost: 1, dr: 15, color: '#ff9a3c',
    plain: 'Secures the links out to cloud services (AWS / Azure).',
    analogy: 'Like sealing the last open window after locking all the doors.',
    desc: 'Enforces PQC-capable TLS on AWS/Azure connections. Removes cloud HNDL vector.' },
];

export const EVENTS = [
  { id: 'e1', title: 'CLOCKBREAKER SURGE',    msg: 'Titan-Class Quantum Engine focused on Meridian Lab.\nHarvest rate doubled on Meridian for 12 seconds.',            threat: true,  effect: 'boost',    node: 'meridian',  btn: 'ACKNOWLEDGE' },
  { id: 'e2', title: 'FIELD INTEL',           msg: 'Stormline Mobile connected over unencrypted public WiFi.\nVPN upgrade cost reduced by 1 token on Stormline.',        threat: false, effect: 'discount', node: 'stormline', btn: 'USE INTEL' },
  { id: 'e3', title: 'QKD PREVIEW',           msg: 'Quantum Key Distribution link available: HQ to Meridian.\nInstall now for bonus points. This is 2035 technology.',   threat: false, effect: 'qkd',      node: 'meridian',  btn: 'INSTALL QKD (+150pts)' },
  { id: 'e4', title: 'CERT FORGERY ATTEMPT',  msg: 'Clockbreakers attempting X.509 forgery on Aurora.\nML-DSA cert blocks it — only if you already patched it.',         threat: true,  effect: 'check',    node: 'aurora',    btn: 'CHECK STATUS' },
  { id: 'e5', title: 'ANYCONNECT LEAK',       msg: 'Unpatched AnyConnect clients leaking remote sessions.\nField agent comms exposed via RSA-TLS. Upgrade HQ VPN.',       threat: true,  effect: 'warn',     node: 'hq',        btn: 'ACKNOWLEDGED' },
  { id: 'e6', title: 'HORIZON COMMS EXPOSED', msg: 'Horizon Defense comms intercepted on MPLS backup link.\nIPSec tunnel still using classic DH key exchange.',            threat: true,  effect: 'warn',     node: 'horizon',   btn: 'ACKNOWLEDGED' },
];

export const C = {
  bg: '#040a04', bgDeep: '#020602', panel: '#0a130a', panel2: '#0d180d',
  border: '#16351a', borderBright: '#2b6f34', dim: '#5a9a63',
  green: '#4dff72', greenSoft: '#b6ffc6', cyan: '#46d9ff', yellow: '#ffc233',
  red: '#ff5470', orange: '#ff9a3c', text: '#93e6a4',
};

export function initNodes() {
  return NODES.map((n) => ({ ...n, risk: 100, patches: {} }));
}

export function riskColor(r) {
  if (r <= 0) return C.green;
  if (r <= 35) return C.yellow;
  if (r <= 65) return C.orange;
  return C.red;
}

export function riskLabel(r) {
  if (r <= 0) return 'SECURED';
  if (r <= 35) return 'LOW RISK';
  if (r <= 65) return 'AT RISK';
  return 'CRITICAL';
}
