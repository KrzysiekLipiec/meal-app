#!/usr/bin/env node
// Wrapper around `vite` that self-stops when a pnpm install starts.
//
// The install signal is a shared file (.vite-stop) in the project root.
// Because the repo lives on the NAS, every machine that mounts it sees the
// same file, so an install from the LXC can stop a dev server running on the
// desktop and vice versa. See scripts/stop-dev.mjs (the preinstall hook).

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const signalFile = path.join(root, '.vite-stop');
const POLL_MS = 500;
const STALE_MS = 5 * 60 * 1000;
const KILL_GRACE_MS = 2000;

function signalAge() {
  try {
    return Date.now() - fs.statSync(signalFile).mtimeMs;
  } catch {
    return -1; // no signal file
  }
}

// Refuse to start while an install is in progress; clear stale signals.
const age = signalAge();
if (age >= 0) {
  if (age < STALE_MS) {
    console.error('[dev] Refusing to start: an install is in progress (.vite-stop present).');
    console.error('[dev] If this is stale, delete .vite-stop and retry.');
    process.exit(1);
  }
  console.warn('[dev] Removing stale .vite-stop signal.');
  fs.rmSync(signalFile, { force: true });
}

const viteBin = path.join(root, 'node_modules', '.bin', 'vite');
const child = spawn(viteBin, process.argv.slice(2), { stdio: 'inherit' });

let stopRequested = false;
let graceTimer = null;

const poller = setInterval(() => {
  const a = signalAge();
  if (!stopRequested && a >= 0 && a < STALE_MS) {
    stopRequested = true;
    console.error('[dev] Install detected, stopping vite...');
    child.kill('SIGTERM');
    graceTimer = setTimeout(() => child.kill('SIGKILL'), KILL_GRACE_MS);
    graceTimer.unref?.();
  }
}, POLL_MS);
poller.unref?.();

child.on('exit', (code, sig) => {
  clearInterval(poller);
  if (graceTimer) clearTimeout(graceTimer);
  if (stopRequested) {
    // Acknowledge the stop only once vite has fully exited, so the install
    // never touches node_modules while the native binaries are still held.
    fs.rmSync(signalFile, { force: true });
    console.error('[dev] Stopped by install. Signal acknowledged.');
  }
  process.exit(code ?? (sig ? 1 : 0));
});
