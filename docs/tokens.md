# Tokens

Referência rápida do que existe em `tokens/`. Os valores são os dos pacotes oficiais —
esta página explica **como os grupos se relacionam**, não substitui os arquivos.

## Duas gerações convivendo

| | v3 (`core` 3.7.0) | v4 (`tokens` 4.0.0-next) |
|---|---|---|
| Prefixo | `--interactive`, `--blue-warm-vivid-70` | `--br-color-*`, `--br-state-*` |
| Tema escuro | parcial (`*-dark`) | completo, via `[data-theme="dark"]` |
| Tokens por componente | não | sim (22 componentes) |
| Figma | UI Kit | Tokens Studio |
| Tipografia | Rawline / Raleway | Noto Sans / Noto Sans Mono / Noto Serif |
| Azul de marca (70) | `#1351b4` | `#0040b4` |

As duas últimas linhas são mudanças de marca reais na v4, não erro de leitura.
Não misture as duas gerações na mesma folha de estilo.

## Camadas da v4

```
paleta        --br-color-blue-warm-vivid-70: #0040b4
   ↓
semântica     --br-state-interactive-color-main: var(--br-color-blue-warm-vivid-70)
   ↓
componente    --br-button-primary-background: var(--br-state-interactive-color-main)
```

**Consuma sempre a camada semântica ou a de componente.** Referenciar a paleta direto
(`var(--br-color-blue-warm-vivid-70)`) quebra o tema escuro, porque é justamente a
camada semântica que troca de valor entre os temas.

## Grupos

| Grupo | Exemplos | Para quê |
|---|---|---|
| `color` | `--br-color-foreground-main-primary`, `--br-color-background-main-secondary` | texto, fundo, borda |
| `state` | `--br-state-hover-*`, `--br-state-focus-color-main`, `--br-state-interactive-*` | hover, foco, ativo, selecionado, desabilitado |
| `typography` | `--br-typography-font-style-heading1`, `--br-typography-font-size-up-3` | escala modular, razão ~1,125 |
| `spacing` | `--br-spacing-layout-1..10` (8→80px), `--br-spacing-adjust-1..5` (4→36px) | layout em múltiplos de 8; *adjust* para ajustes finos |
| `surface` | `--br-surface-rounder-sm|md|lg` (4/8/12px), `--br-surface-border-width-*` | raio, borda, opacidade |
| `elevation` | `--br-elevation-shadow-style-level0..4` | sombras em 5 níveis |
| `grid` | `--br-grid-breakpoint-*`, `--br-grid-gutter-*`, `--br-grid-margin-*` | 576 / 992 / 1280 / 1600px, densidade compacta/regular/espaçosa |
| `motion` | `--br-motion-duration-fast-1..4`, `--br-motion-easing-*` | 50ms→1s |
| `iconography`, `form`, `skeleton`, `content` | — | tokens específicos |

## Temas

```html
<html data-theme="light">  <!-- ou "dark" -->
```

```html
<link rel="stylesheet" href="tokens/v4/css/tokens.css" />
<link rel="stylesheet" href="tokens/v4/css/theme/light.css" />
<link rel="stylesheet" href="tokens/v4/css/theme/dark.css" />
```

Para seguir a preferência do sistema, o pacote traz também
`theme/light/prefers-color-scheme.css` e o equivalente escuro.

`tokens/v4/css/contrast-mode.css` é o modo de alto contraste — obrigatório de oferecer
em serviços públicos, e já presente no seletor de contraste do header do DS.

## Escala tipográfica

Base 16px, razão ~1,125 (`up-1` = 1.125rem … `up-8` = 2.5658rem; `down-1..4` abaixo da base).
Os *font styles* já combinam peso, tamanho, entrelinha e família:

```css
h1 { font: var(--br-typography-font-style-heading1); }  /* 700 2.5658rem/1.2 */
p  { font: var(--br-typography-font-style-paragraph); } /* 400 1rem/1.5 */
```

## Regenerando

```bash
npm run sync:tokens
```

Lê de `node_modules/@govbr-ds/*`, reescreve `tokens/` e atualiza `MANIFEST.json`.
Para atualizar a versão do DS: mude `package.json` (em `dependencies` **e** em `govbrDs`),
rode `npm install && npm run sync:tokens`, revise o diff e faça commit.
