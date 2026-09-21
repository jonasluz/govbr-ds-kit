#!/usr/bin/env node
/**
 * check-contrast.mjs
 *
 * Valida o contraste (WCAG 2.1) dos pares semanticos que este kit usa,
 * lendo os tokens versionados em tokens/ — nao valores digitados a mao.
 *
 *   npm run check:contrast
 *
 * AA exige 4.5:1 para texto normal, 3:1 para texto grande e para
 * componentes de interface / estados de foco (1.4.11).
 */

import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TOKENS = join(ROOT, 'tokens')

function readCss(relPath) {
  const full = join(TOKENS, relPath)
  if (!existsSync(full)) {
    console.error(`\n  x  ${relPath} nao encontrado. Rode "npm run sync:tokens".\n`)
    process.exit(1)
  }
  return readFileSync(full, 'utf8')
}

/** Mapa nome -> valor bruto de todas as custom properties de um CSS. */
function parseVars(css) {
  const map = new Map()
  for (const [, name, value] of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    map.set(name, value.trim())
  }
  return map
}

const base = parseVars(readCss('v4/css/tokens.css'))
const themes = {
  claro: parseVars(readCss('v4/css/theme/light.css')),
  escuro: parseVars(readCss('v4/css/theme/dark.css')),
}

/** Resolve um token ate um hex, seguindo var(--x, fallback). */
function resolveColor(name, theme, depth = 0) {
  if (depth > 12) return null
  const raw = theme.get(name) ?? base.get(name)
  if (!raw) return null
  const hex = raw.match(/#[0-9a-f]{3,8}\b/i)
  const ref = raw.match(/var\(\s*(--[\w-]+)/)
  if (ref) {
    const resolved = resolveColor(ref[1], theme, depth + 1)
    if (resolved) return resolved
  }
  return hex ? hex[0] : null
}

function toRgb(hex) {
  let h = hex.slice(1)
  if (h.length === 3) h = [...h].map((c) => c + c).join('')
  const n = Number.parseInt(h.slice(0, 6), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function luminance(hex) {
  const [r, g, b] = toRgb(hex).map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

/** Pares verificados: [rotulo, frente, fundo, minimo] */
const PAIRS = [
  ['Texto primario sobre fundo', '--br-color-foreground-main-primary', '--br-color-background-main-primary', 4.5],
  ['Texto secundario sobre fundo', '--br-color-foreground-main-secondary', '--br-color-background-main-primary', 4.5],
  ['Texto primario sobre fundo alt.', '--br-color-foreground-main-primary', '--br-color-background-main-secondary', 4.5],
  ['Texto em contraste sobre fundo escuro', '--br-color-foreground-contrast-primary', '--br-color-background-contrast-primary', 4.5],
  ['Texto do botao primario', '--br-state-interactive-color-foreground-main', '--br-state-interactive-color-main', 4.5],
  ['Texto do botao CTA', '--br-state-cta-color-foreground-main', '--br-state-cta-color-main', 4.5],
  ['Botao primario sobre fundo (UI)', '--br-state-interactive-color-main', '--br-color-background-main-primary', 3],
  ['Borda de campo sobre fundo (UI)', '--br-color-border-secondary', '--br-color-background-main-primary', 3],
  ['Anel de foco sobre fundo (UI)', '--br-state-focus-color-main', '--br-color-background-main-primary', 3],
  ['Selecionado sobre fundo (UI)', '--br-state-selected-color-main', '--br-color-background-main-primary', 3],
]

/**
 * Desvios ja conhecidos do upstream. Ficam registrados (e visiveis na saida)
 * em vez de derrubar o CI; cada entrada deve ter um issue correspondente.
 */
const BASELINE_PATH = join(ROOT, 'docs', 'contraste-desvios.json')
const baseline = existsSync(BASELINE_PATH) ? JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) : { desvios: [] }
const isKnown = (theme, label) => baseline.desvios.some((d) => d.tema === theme && d.par === label)

let failures = 0
let skipped = 0
let known = 0

for (const [themeName, theme] of Object.entries(themes)) {
  console.log(`\n  tema ${themeName}`)
  for (const [label, fgToken, bgToken, min] of PAIRS) {
    const fg = resolveColor(fgToken, theme)
    const bg = resolveColor(bgToken, theme)
    if (!fg || !bg) {
      skipped += 1
      console.log(`    -   ${label.padEnd(38)} token nao resolvido`)
      continue
    }
    const r = ratio(fg, bg)
    const ok = r >= min
    let mark = 'ok '
    if (!ok) {
      if (isKnown(themeName, label)) {
        known += 1
        mark = '!  '
      } else {
        failures += 1
        mark = 'x  '
      }
    }
    console.log(`    ${mark} ${label.padEnd(38)} ${r.toFixed(2)}:1 (min ${min}) ${fg} / ${bg}`)
  }
}

console.log('')
if (skipped) console.log(`  ${skipped} par(es) ignorado(s) por token ausente.`)
if (known) console.log(`  !  ${known} desvio(s) conhecido(s) do upstream — ver docs/contraste-desvios.json`)
if (failures) {
  console.error(`  x  ${failures} par(es) novo(s) abaixo do minimo WCAG AA.\n`)
  process.exit(1)
}
console.log('  ok  nenhum desvio novo de contraste.\n')
