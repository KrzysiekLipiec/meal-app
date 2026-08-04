#!/usr/bin/env node
// pnpm `preinstall` hook: ask any running `pnpm dev` server to stop before
// install touches node_modules.
//
// Drops a .vite-stop signal file in the project root, then waits for the dev
// wrapper (scripts/dev.mjs) to acknowledge by deleting it. Works across
// machines because the repo (and the signal file) lives on the NAS.
// Uses only the Node stdlib, so it runs even on a fresh clone with no deps.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const signalFile = path.join(root, '.vite-stop');
const TIMEOUT_MS = 10_000;
const POLL_MS = 300;

fs.writeFileSync(signalFile, new Date().toISOString());
console.log('[preinstall] Signaled dev server to stop (if running)...');

const deadline = Date.now() + TIMEOUT_MS;
while (Date.now() < deadline && fs.existsSync(signalFile)) {
  await new Promise((resolve) => setTimeout(resolve, POLL_MS));
}

if (fs.existsSync(signalFile)) {
  // No dev server acknowledged: either none was running or it ignored us.
  // Remove the signal so it cannot block a later `pnpm dev` start.
  fs.rmSync(signalFile, { force: true });
  console.log('[preinstall] No dev server acknowledged; continuing.');
} else {
  console.log('[preinstall] Dev server stopped cleanly.');
}
