# Versões e o que vem na 4.x

Este sistema descreve o **`@govbr-ds/core` 3.7.0** — o que está em produção nos serviços gov.br hoje. Os tokens 4.x já estão publicados no npm sob a tag `next` e mudam coisas visíveis. Saber disso agora evita retrabalho.

## O que muda na 4.x

**Nomes.** Todo token ganha o prefixo `--br-` e uma camada semântica explícita.

| 3.x | 4.x |
|---|---|
| `--interactive` | `--br-state-interactive-color-main` |
| `--interactive-alternative` | `--br-state-cta-color-main` |
| `--background` | `--br-color-background-main-primary` |
| `--background-alternative` | `--br-color-background-main-secondary` |
| `--visited` | `--br-state-visited-color-main` |
| `--focus-color` | `--br-state-focus-color-main` |
| `--disabled` | `--br-state-disabled-color-main` |

**Valores.** Duas mudanças de marca, não de nomenclatura:

- **Azul institucional:** `#1351b4` → `#0040b4`. Mais escuro; sobe de 7.3:1 para 8.6:1 sobre branco.
- **Tipografia:** Rawline / Raleway → **Noto Sans** (com Noto Sans Mono e Noto Serif). Resolve a dependência do CDN do SERPRO, já que a Noto está no Google Fonts. A altura-x é diferente: layouts ajustados à métrica da Rawline precisam ser revistos.

**Estrutura.** Tema escuro completo (`[data-theme="dark"]`), tokens por componente (22 deles), modo de alto contraste em arquivo próprio e export para Tokens Studio no lugar do UI Kit do Figma.

## O que fazer agora

1. **Não migre ainda.** Enquanto a 4.x estiver só em `next`, os valores podem mudar.
2. **Escreva CSS que sobreviva à migração.** Nunca referencie a paleta direto: onde hoje você escreve `var(--blue-warm-vivid-70)`, escreva `var(--interactive)`. Isso reduz a migração a uma tabela de renomeação.
3. **Quando migrar**, uma folha de compatibilidade troca o motor sem tocar no CSS do produto:

   ```css
   :root {
     --interactive: var(--br-state-interactive-color-main);
     --background: var(--br-color-background-main-primary);
     --color: var(--br-color-foreground-main-primary);
   }
   ```

Acompanhe <https://gitlab.com/govbr-ds>.
