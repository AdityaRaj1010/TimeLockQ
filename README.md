# Project TimeLock-Q: Defend the Timeline

A terminal-styled React game about migrating a network to post-quantum cryptography before the "Clockbreakers" harvest enough data.

Prototype into a Vite + React project.

Built to be playable by anyone — no security background needed. A guided
walkthrough runs on first launch, a plain-language field manual explains
every fix, and the network map shows each site's fix-first priority at a
glance.

## Run

```bash
npm install
npm run dev
```

Then open the printed local URL.

> Dependencies resolve from the public npm registry (`registry.npmjs.org`).
> No private/internal registry is required.

## How to play

1. **Accept the mission** and read the briefing (or jump straight to
   *How the 4 fixes work* for a jargon-free primer).
2. A **guided tour** highlights each part of the screen. The timer stays
   frozen until you finish it.
3. On the map, fix the **red #1** sites first. Select a site, then apply
   **Upgrade VPN** (marked *DO FIRST*) — it removes the most risk.
4. Keep the **harvest bar** below 100%. It pauses whenever an alert is open,
   so you always have time to read.

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
  main.jsx            # React entry point
  App.jsx             # Game state, tick loop, event system, tour/guide wiring
  gameData.js         # NODES, EDGES, PATCHES, EVENTS, DIFFICULTY, colors, helpers
  index.css           # Design tokens, phosphor-terminal styles + animations
  components/
    TopBar.jsx        # Tokens / score / harvest meter
    NetworkMap.jsx    # SVG station map — gauge rings, priority badges, hover info
    SitePanel.jsx     # Selected-site fixes panel
    LogPanel.jsx      # Event log
    EventModal.jsx    # Random-event alerts (freeze the timer while open)
    Walkthrough.jsx   # First-run guided tour (spotlight coach-marks)
    PatchGuide.jsx    # Plain-language "How the 4 fixes work" manual
    IntroScreen.jsx
    BriefingScreen.jsx
    WinScreen.jsx
    LoseScreen.jsx
```

Difficulty and pacing live in `DIFFICULTY` in `gameData.js` — tweak
`harvestMult` (lower = gentler) or `eventEveryMs` there.
