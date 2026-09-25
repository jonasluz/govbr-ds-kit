#!/usr/bin/env node
/**
 * build-claude-design.mjs
 *
 * Gera o pacote no layout que o /design-sync do Claude Design consome, a partir
 * da mesma fonte que alimenta o Design System deste repositorio (design-system/).
 *
 *   node scripts/build-claude-design.mjs
 *
 * Saida em claude-design/:
 *   readme.md
 *   _ds_bundle.css                                   tokens compilados (temas claro/escuro)
 *   components/<grupo>/<Comp>/<Comp>.html            preview autocontido (tokens embutidos)
 *   components/<grupo>/<Comp>/<Comp>.prompt.md       diretrizes
 *
 * Os previews sao autocontidos de proposito: embutem os tokens compilados, entao
 * renderizam mesmo onde a folha do projeto nao for carregada.
 */

import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = process.env.DS_ROOT ?? resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'design-system')
const OUT = join(ROOT, 'claude-design')

/** Grupo de cada componente: define a pasta e o rotulo do card. */
const GRUPOS = {
  Button: { pasta: 'acoes', rotulo: 'Ações' },
  Input: { pasta: 'formulario', rotulo: 'Formulário' },
  Select: { pasta: 'formulario', rotulo: 'Formulário' },
  Checkbox: { pasta: 'formulario', rotulo: 'Formulário' },
  Radio: { pasta: 'formulario', rotulo: 'Formulário' },
  Textarea: { pasta: 'formulario', rotulo: 'Formulário' },
  Switch: { pasta: 'formulario', rotulo: 'Formulário' },
  Upload: { pasta: 'formulario', rotulo: 'Formulário' },
  Message: { pasta: 'feedback', rotulo: 'Feedback' },
  Modal: { pasta: 'feedback', rotulo: 'Feedback' },
  Tooltip: { pasta: 'feedback', rotulo: 'Feedback' },
  Notification: { pasta: 'feedback', rotulo: 'Feedback' },
  Loading: { pasta: 'feedback', rotulo: 'Feedback' },
  Card: { pasta: 'estrutura', rotulo: 'Estrutura' },
  Header: { pasta: 'estrutura', rotulo: 'Estrutura' },
  Footer: { pasta: 'estrutura', rotulo: 'Estrutura' },
  Avatar: { pasta: 'estrutura', rotulo: 'Estrutura' },
  Tag: { pasta: 'estrutura', rotulo: 'Estrutura' },
  Divider: { pasta: 'estrutura', rotulo: 'Estrutura' },
  Menu: { pasta: 'navegacao', rotulo: 'Navegação' },
  Breadcrumb: { pasta: 'navegacao', rotulo: 'Navegação' },
  Skiplink: { pasta: 'navegacao', rotulo: 'Navegação' },
  Cover: { pasta: 'marca', rotulo: 'Marca' },
  PageTemplate: { pasta: 'padrao', rotulo: 'Padrão' },
}

const tokens = JSON.parse(readFileSync(join(SRC, 'tokens.json'), 'utf8'))
const temas = tokens.color.themes.map((t) => t.id)
const [temaBase] = temas

/** `{outro-token}` -> `var(--outro-token)` */
const val = (v) => {
  const m = /^\{(.+)\}$/.exec(String(v).trim())
  return m ? `var(--${m[1]})` : String(v).trim()
}

const valorNoTema = (t, tema) =>
  typeof t.value === 'string' ? t.value : (t.value[tema] ?? t.value[temaBase])

function compilarCss() {
  const linhas = []
  linhas.push('/* Gerado por scripts/build-claude-design.mjs — não edite à mão. */')
  linhas.push(`/* Fonte: ${tokens.meta?.source ?? tokens.name} */`)
  linhas.push('')

  // Importar fontes do CDN (Rawline + Google Fonts)
  linhas.push('@import url("https://fonts.cdnfonts.com/css/rawline");')
  linhas.push('@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap");')
  linhas.push('')

  // Cores do tema base + escalas que não variam por tema.
  const base = []
  for (const t of tokens.color.tokens) base.push(`  --${t.name}: ${val(valorNoTema(t, temaBase))};`)
  for (const t of tokens.shadow?.tokens ?? []) base.push(`  --${t.name}: ${val(valorNoTema(t, temaBase))};`)
  linhas.push(`:root,\n[data-theme="${temaBase}"] {`, ...base, '}', '')

  // Demais temas: só o que muda.
  for (const tema of temas.slice(1)) {
    const over = []
    for (const t of [...tokens.color.tokens, ...(tokens.shadow?.tokens ?? [])]) {
      const a = valorNoTema(t, temaBase)
      const b = valorNoTema(t, tema)
      if (String(a) !== String(b)) over.push(`  --${t.name}: ${val(b)};`)
    }
    linhas.push(`[data-theme="${tema}"] {`, ...over, '}', '')
  }

  // Famílias sem tema: spacing, radius, opacity, border, breakpoint, e as fontes.
  const escalas = []
  const kindMap = {
    'rounder-none': 'radius',
    'opacity-xs': 'other',
    'opacity-sm': 'other',
    'opacity-md': 'other',
    'opacity-lg': 'other',
    'opacity-xl': 'other',
  }
  for (const [chave, fam] of Object.entries(tokens)) {
    if (chave === 'color' || chave === 'shadow' || chave === 'type' || !fam?.tokens) continue
    for (const t of fam.tokens) {
      const line = `  --${t.name}: ${val(t.value)};`
      const kind = kindMap[t.name]
      escalas.push(kind ? `${line} /* @kind ${kind} */` : line)
    }
  }
  for (const [chave, stack] of Object.entries(tokens.type.families)) escalas.push(`  --font-${chave}: ${stack};`)
  linhas.push(':root {', ...escalas, '}', '')

  // Um utilitário por estilo de texto.
  for (const g of tokens.type.groups) {
    for (const s of g.styles) {
      const fam = s.family ?? g.family
      linhas.push(
        `.${s.name} {`,
        `  font-family: var(--font-${fam});`,
        `  font-size: ${s.fontSize};`,
        `  line-height: ${s.lineHeight};`,
        `  font-weight: ${s.fontWeight};`,
        '}',
      )
    }
  }
  linhas.push('')
  return linhas.join('\n')
}

const css = compilarCss()

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
writeFileSync(join(OUT, '_ds_bundle.css'), css)

// readme do projeto: o livro da marca, mais as seções de apoio.
const readme = [
  readFileSync(join(SRC, 'README.md'), 'utf8').trim(),
  '\n---\n',
  readFileSync(join(SRC, 'acessibilidade.md'), 'utf8').trim(),
  '\n---\n',
  readFileSync(join(SRC, 'versoes.md'), 'utf8').trim(),
  '',
].join('\n')
writeFileSync(join(OUT, 'readme.md'), readme)

let n = 0
for (const [comp, { pasta }] of Object.entries(GRUPOS)) {
  const dir = join(OUT, 'components', pasta, comp)
  mkdirSync(dir, { recursive: true })

  let html = readFileSync(join(SRC, 'components', comp, 'preview.html'), 'utf8')
  // Torna o preview autocontido: os tokens deixam de depender da folha do projeto.
  html = html.replace(/\n/, `\n<style>\n${css}</style>\n`)
  writeFileSync(join(dir, `${comp}.html`), html)

  try {
    cpSync(join(SRC, 'components', comp, 'README.md'), join(dir, `${comp}.prompt.md`))
  } catch {
    /* Cover não tem diretrizes — é a capa. */
  }
  n += 1
}

console.log(`  ok  claude-design/ gerado: ${n} componentes, ${temas.length} temas`)
console.log(`      pronto para /design-sync ou para "Send to Claude Code Web"`)
