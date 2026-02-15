# BESS Monitor — Vite React TypeScript (Proof of Concept)

This small app simulates a real-time feed from a Battery Energy Storage System (BESS) and lets you choose charts to visualize metrics.

Quick start

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

Notes

- The feed is simulated in `src/hooks/useSimulatedFeed.ts`.
- Chart selection and types are in `src/components/ChartSelector.tsx`.
- Charts use `recharts` in `src/components/BESSMonitor.tsx`.

Recommended install (dev machine):

```bash
npm install
npm run dev
```
