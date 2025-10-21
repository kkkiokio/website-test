#!/usr/bin/env node
import { rm, cp, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const srcDir = path.join(projectRoot, 'public')
const outDir = path.join(projectRoot, 'dist')

await rm(outDir, { recursive: true, force: true })
await mkdir(outDir, { recursive: true })
await cp(srcDir, outDir, { recursive: true })

console.log(`Copied static assets from ${srcDir} to ${outDir}`)
