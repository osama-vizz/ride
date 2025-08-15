#!/usr/bin/env node

import { build } from 'esbuild';
import { execSync } from 'child_process';

console.log('Building client...');
execSync('npx vite build', { stdio: 'inherit' });

console.log('Building server...');
await build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist',
  external: [
    'pg-native',
    '@neondatabase/serverless',
    'lightningcss',
    '@babel/preset-typescript'
  ],
  packages: 'external',
  target: 'node20',
  sourcemap: true,
  logLevel: 'info'
});

console.log('Build completed successfully!');