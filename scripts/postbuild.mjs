#!/usr/bin/env node
/**
 * GitHub Pages serves `404.html` for unknown paths. Copying the built index
 * there lets the client-side router handle deep links such as `/het-boek`.
 * `.nojekyll` stops Pages from ignoring files that start with an underscore.
 */
import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const index = join(dist, 'index.html')

if (!existsSync(index)) {
  console.error('postbuild: dist/index.html ontbreekt. Bouw de site eerst.')
  process.exit(1)
}

copyFileSync(index, join(dist, '404.html'))
writeFileSync(join(dist, '.nojekyll'), '')

console.log('postbuild: 404.html en .nojekyll toegevoegd voor GitHub Pages.')
