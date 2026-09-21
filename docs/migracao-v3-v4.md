# Migração v3 → v4

A v4 do GOVBR-DS está em `next` no npm. **Não use em produção ainda.** Este documento
existe para que a migração, quando vier, seja um diff revisável e não um reescreve-tudo.

## O que muda

### Nomes

Todo token ganha o prefixo `--br-` e uma camada semântica explícita.

| v3 | v4 |
|---|---|
| `--interactive` | `--br-state-interactive-color-main` |
| `--interactive-alternative` | `--br-state-cta-color-main` |
| `--background` | `--br-color-background-main-primary` |
| `--background-alternative` | `--br-color-background-main-secondary` |
| `--visited` | `--br-state-visited-color-main` |
| `--focus` | `--br-state-focus-color-main` |
| `--disabled` | `--br-state-disabled-color-main` |
| `--blue-warm-vivid-70` | `--br-color-blue-warm-vivid-70` |

### Valores

Duas mudanças de marca, não de nomenclatura:

- **Azul de marca (blue-warm-vivid-70):** `#1351b4` → `#0040b4`. Mais escuro, contraste
  maior sobre branco (8.56:1 contra 6.5:1). Afeta botão primário, links e foco.
- **Tipografia:** Rawline/Raleway → **Noto Sans**, com Noto Sans Mono para código e
  Noto Serif como terciária. Noto tem cobertura ampla de scripts e está no Google Fonts,
  o que resolve a dependência do CDN do SERPRO para a Rawline.

Revalide qualquer contraste que você tenha calculado à mão contra o azul antigo, e
qualquer layout ajustado à métrica da Rawline (a Noto Sans tem altura-x diferente).

### Estrutura

- Tema escuro completo e tokens por componente (22) passam a existir.
- `contrast-mode.css` separado.
- Export Tokens Studio, substituindo o UI Kit como fonte para o Figma.

## Estratégia recomendada

1. **Agora:** consuma o core 3.7.0 em produção; use os tokens v4 apenas para design
   (Figma) e para este kit. É o que `package.json` já faz.
2. **Prepare:** no seu CSS, nunca referencie a paleta direto. Se hoje você escreve
   `var(--blue-warm-vivid-70)`, troque por `var(--interactive)`. Só isso já reduz a
   migração a uma tabela de renomeação.
3. **Camada de compatibilidade:** quando for migrar, uma folha que mapeia os nomes v3
   para os v4 permite trocar o motor sem tocar no CSS do produto:

   ```css
   :root {
     --interactive: var(--br-state-interactive-color-main);
     --background: var(--br-color-background-main-primary);
     /* ... */
   }
   ```

4. **Não migre antes do `latest`.** Enquanto a v4 estiver só em `next`, os valores
   ainda podem mudar. Acompanhe <https://gitlab.com/govbr-ds> e o job agendado do CI.

## Como este repositório ajuda

`tokens/v3/` e `tokens/v4/` convivem. Quando a v4 virar `latest`, basta atualizar
`package.json`, rodar `npm run sync:tokens` e o diff mostra exatamente o que mudou
entre a versão que você validou e a nova.
