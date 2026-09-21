#!/usr/bin/env node
/**
 * sync-tokens.mjs
 *
 * Copia os arquivos de token publicados pelo GOVBR-DS (npm) para `tokens/`,
 * versionando um snapshot auditavel dentro deste repositorio.
 *
 *   npm run sync:tokens     regenera tokens/ a partir de node_modules
 *   npm run check:tokens    falha se tokens/ estiver diferente do pacote (usado no CI)
 *
 * Fonte: @govbr-ds/tokens (tokens v4) e @govbr-ds/core (tokens v3, producao).
 * Nada aqui edita o DS oficial — este repositorio apenas consome e fixa versoes.
 */

import { createHash } from 'node:crypto'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'tokens')
const CHECK = process.argv.includes('--check')

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const TOKENS_PKG = join(ROOT, 'node_modules', '@govbr-ds', 'tokens')
const CORE_PKG = join(ROOT, 'node_modules', '@govbr-ds', 'core')

/** @type {{from: string, to: string, base: string}[]} */
const COPIES = [
  { base: TOKENS_PKG, from: 'dist/css/tokens.css', to: 'v4/css/tokens.css' },
  { base: TOKENS_PKG, from: 'dist/css/contrast-mode.css', to: 'v4/css/contrast-mode.css' },
  { base: TOKENS_PKG, from: 'dist/css/theme/light/tokens.css', to: 'v4/css/theme/light.css' },
  { base: TOKENS_PKG, from: 'dist/css/theme/dark/tokens.css', to: 'v4/css/theme/dark.css' },
  { base: TOKENS_PKG, from: 'dist/scss/tokens.scss', to: 'v4/scss/tokens.scss' },
  { base: TOKENS_PKG, from: 'dist/json/tokens.json', to: 'v4/json/tokens.json' },
  { base: TOKENS_PKG, from: 'dist/json/theme/light/tokens.json', to: 'v4/json/theme/light.json' },
  { base: TOKENS_PKG, from: 'dist/json/theme/dark/tokens.json', to: 'v4/json/theme/dark.json' },
  { base: TOKENS_PKG, from: 'dist/tokens-studio/tokens.json', to: 'v4/figma/tokens-studio.json' },
  { base: CORE_PKG, from: 'dist/core-tokens.css', to: 'v3/css/core-tokens.css' },
]

/** Diretorios copiados inteiros (tokens por componente). */
const TREES = [{ base: TOKENS_PKG, from: 'dist/css/components', to: 'v4/css/components' }]

function fail(msg) {
  console.error(`\n  x  ${msg}\n`)
  process.exit(1)
}

function ensurePackages() {
  for (const [name, path] of [
    ['@govbr-ds/tokens', TOKENS_PKG],
    ['@govbr-ds/core', CORE_PKG],
  ]) {
    if (!existsSync(path)) fail(`${name} nao encontrado. Rode "npm install" antes de sincronizar.`)
  }
}

function installedVersion(path) {
  return JSON.parse(readFileSync(join(path, 'package.json'), 'utf8')).version
}

function listFiles(dir, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) listFiles(full, acc)
    else acc.push(full)
  }
  return acc
}

function hashDir(dir) {
  const files = listFiles(dir).sort()
  const h = createHash('sha256')
  for (const f of files) {
    h.update(relative(dir, f).replace(/\\/g, '/'))
    h.update(readFileSync(f))
  }
  return h.digest('hex')
}

function build(target) {
  rmSync(target, { recursive: true, force: true })
  for (const { base, from, to } of COPIES) {
    const src = join(base, from)
    if (!existsSync(src)) fail(`arquivo ausente no pacote: ${relative(ROOT, src)}`)
    const dest = join(target, to)
    mkdirSync(dirname(dest), { recursive: true })
    cpSync(src, dest)
  }
  for (const { base, from, to } of TREES) {
    const src = join(base, from)
    if (!existsSync(src)) continue
    cpSync(src, join(target, to), { recursive: true })
  }

  const manifest = {
    geradoEm: new Date().toISOString().slice(0, 10),
    gerador: 'scripts/sync-tokens.mjs',
    pacotes: {
      '@govbr-ds/core': installedVersion(CORE_PKG),
      '@govbr-ds/tokens': installedVersion(TOKENS_PKG),
    },
    fixadoEmPackageJson: pkg.govbrDs,
    arquivos: listFiles(target)
      .map((f) => relative(target, f).replace(/\\/g, '/'))
      .sort(),
  }
  writeFileSync(join(target, 'MANIFEST.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  return manifest
}

ensurePackages()

const declared = pkg.govbrDs ?? {}
for (const [name, path] of [
  ['@govbr-ds/core', CORE_PKG],
  ['@govbr-ds/tokens', TOKENS_PKG],
]) {
  const key = name.split('/')[1]
  const found = installedVersion(path)
  if (declared[key] && declared[key] !== found) {
    console.warn(`  !  ${name}: package.json fixa ${declared[key]}, instalado ${found}`)
  }
}

if (CHECK) {
  const tmp = join(ROOT, '.tmp', 'tokens-check')
  build(tmp)
  const same = existsSync(OUT) && hashDir(OUT) === hashDir(tmp)
  rmSync(join(ROOT, '.tmp'), { recursive: true, force: true })
  if (!same) fail('tokens/ esta defasado. Rode "npm run sync:tokens" e faca commit do resultado.')
  console.log('  ok  tokens/ corresponde aos pacotes instalados.')
} else {
  const manifest = build(OUT)
  console.log(`  ok  ${manifest.arquivos.length} arquivos gerados em tokens/`)
  console.log(`      core ${manifest.pacotes['@govbr-ds/core']} | tokens ${manifest.pacotes['@govbr-ds/tokens']}`)
}
