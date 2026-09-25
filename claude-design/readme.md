O Padrão Digital de Governo é obrigatório para serviços digitais do Governo Federal brasileiro. Este sistema espelha o `@govbr-ds/core` 3.7.0 — os valores aqui são os do pacote oficial, não aproximações. Onde acrescentei algo que o core não nomeia, o token diz isso na sua nota de uso.

A regra que governa tudo: **um serviço gov.br deve parecer um serviço gov.br.** O cidadão reconhece o padrão e confia nele. Personalização de marca por órgão se limita à assinatura no cabeçalho e no rodapé — não à cor da ação, à tipografia nem à forma dos componentes.

## Voz e conteúdo

- Trate o cidadão por **você**. O órgão fala na primeira pessoa do plural quando precisa ("recebemos sua solicitação"), mas prefira a voz do serviço ("sua solicitação foi recebida").
- Caixa de frase em tudo — títulos, botões, rótulos. **Nunca CAIXA ALTA** para ênfase: além de gritar, quebra a leitura por leitores de tela.
- Botão é frase verbal e específica: "Enviar solicitação", não "Enviar", nunca "OK".
- Erro diz o que houve e o que fazer: "O CPF informado não tem 11 dígitos. Confira e digite novamente." Nunca "Erro de validação".
- Sem emoji, sem exclamação, sem jargão administrativo onde existe palavra comum. "Documento de identificação", não "documento hábil de identificação civil".
- Números de processo e protocolo em `code`, para não se confundirem com texto corrido.

## Cor

Trabalhe em pares, não em cores soltas: um token de fundo e o token de texto que a nota dele autoriza.

- Página: `color` sobre `background`. Segundo nível: `color` sobre `background-alternative`.
- Ação primária: `on-interactive` sobre `interactive`. **Nunca escreva branco literal** num botão — no tema escuro `interactive` clareia e pede texto escuro; é para isso que `on-interactive` existe.
- Ação de destaque do serviço (o verde do gov.br): `on-interactive-alternative` sobre `interactive-alternative`. Um por tela, no máximo.
- Foco: `focus-color`, tracejado, `width-lg`, deslocado `spacing-half`. Dourado de propósito — se o foco fosse azul se perderia dentro da própria ação.
- Estado nunca é só cor. Sucesso, atenção, erro e informação carregam **ícone e texto** além do `success` / `warning` / `danger` / `info`. `warning` (amarelo puro) não serve como cor de texto em tema nenhum: use no ícone e na borda.
- `interactive` e `info` são a mesma cor. Por isso uma mensagem informativa não pode ter aparência de clicável — sem sublinhado, sem cursor de link.
- Não referencie a paleta direto (`blue-warm-vivid-70`) no CSS do produto. Use o token semântico (`interactive`), que é o que troca de valor entre os temas.

## Tipografia

Rawline é a fonte do padrão, com Raleway como reserva — o stack está em `base`. A Rawline é servida pelo CDN do SERPRO (`cdngovbr-ds.estaleiro.serpro.gov.br`) e não está no npm nem no Google Fonts; **não há arquivo de fonte neste sistema por isso**, e os previews renderizam em Raleway. Em produção, carregue as duas.

- A base é **14px**, não 16px. A escala inteira deriva daí — não a suba.
- Um `h1` por página. Sem pular níveis.
- `body-large` só para abertura de página editorial. Formulário e tabela usam `body`.
- `small` nunca carrega informação essencial — é ajuda, legenda, metadado.

## Espaçamento e forma

- Escala de 8px. `spacing-half` e `spacing-baseh` são ajuste dentro de componentes, não layout.
- Entre campos de um formulário: `spacing-2x`. Entre blocos: `spacing-3x`. Entre seções: `spacing-4x`.
- Botão é **pílula** (`rounder-pill`) — arredondar só os cantos descaracteriza o padrão. Campo é `rounder-sm`, card e mensagem são `rounder-md`, faixas de largura total são `rounder-none`.
- Sombra com parcimônia: `elevation-1` em repouso, `elevation-3` para o que flutua sobre o conteúdo, `elevation-4` só para modal.

## Estrutura de página

Todo serviço tem, nesta ordem: atalhos de navegação (`br-skiplink`), cabeçalho com a assinatura do órgão, menu, trilha de navegação, `main` com um `h1`, e rodapé com a licença. Os atalhos não são opcional — são o primeiro `Tab` de quem navega por teclado.

## Iconografia

O DS usa **Font Awesome 5.11.2**, carregado por CDN. Não há SVGs próprios: ícone é `<i class="fas fa-...">` com `aria-hidden="true"` quando decorativo, e `aria-label` no elemento que o contém quando ele é a única etiqueta. Não misture outra biblioteca de ícones na mesma tela.

## Acessibilidade

Não é camada final, é condição de publicação (Lei 13.146/2015, eMAG). A seção **Acessibilidade** deste sistema tem as regras; o resumo é: todo campo com `label`, erro com `role="alert"`, foco sempre visível, ordem do DOM igual à ordem visual, nada só por cor.

## Como consumir

Em código, o caminho é o pacote oficial — este sistema descreve o padrão, não o substitui:

```bash
npm install @govbr-ds/core@3.7.0
```

```html
<link rel="stylesheet" href="core.min.css" />
<script src="core-init.min.js"></script>
```

Os componentes interativos (menu, select, tooltip, modal) **precisam do JavaScript** para funcionar. Marcação sozinha não basta.

Ao montar uma interface a partir deste sistema, use as classes `br-*` do core e os tokens acima. Não sobrescreva seletores `.br-*`: quando precisar customizar, redefina a *custom property*.

---

# Acessibilidade

Serviços do Governo Federal têm obrigação legal de acessibilidade (Lei 13.146/2015, Decreto 5.296/2004, eMAG). O padrão ajuda; a marcação errada anula o componente certo.

## Formulários

- Todo campo tem `<label for="id">`. **Placeholder não é rótulo** — some ao digitar e não é lido de forma confiável.
- Ajuda e erro ligados ao campo por `aria-describedby`.
- Erro anunciado sem navegação: `role="alert"` na mensagem, `aria-invalid="true"` no campo.
- Grupos de opção em `<fieldset>` com `<legend>`.
- Campo obrigatório marcado no rótulo, em texto — não só com asterisco colorido.

## Teclado

- Ordem do DOM igual à ordem visual. Nunca `tabindex` positivo.
- Foco sempre visível: `focus-color`, tracejado, `width-lg`, deslocado `spacing-half`. Não remova o outline sem pôr outro indicador.
- Modal e menu devolvem o foco ao elemento que os abriu.
- Nada disponível apenas por hover.

## Cor e contraste

- Texto: 4.5:1 mínimo. Texto a partir de 24px (ou 19px em negrito): 3:1.
- Bordas de campo, ícones com significado e anel de foco: 3:1 (WCAG 2.1 SC 1.4.11).
- Estado nunca só por cor — ícone e texto junto.
- O modo de alto contraste do DS (`contrast-mode.css`, disponível no seletor do cabeçalho) é exigência para serviço público: não o remova para "limpar" a interface.

## Conteúdo

- Um `h1` por página, hierarquia sem pular níveis.
- `alt` descritivo; `alt=""` em imagem decorativa.
- Link com texto que faz sentido fora de contexto — nunca "clique aqui".
- Tabela com `<th scope>` e `<caption>`.

## Desvio conhecido nos tokens oficiais

Nos tokens 4.x, `--br-color-border-secondary` (#757575) sobre `--br-color-background-main-primary` (#2d2e2f) no tema escuro dá **2.95:1**, 0,05 abaixo do mínimo de 3:1 para componentes de interface. Neste sistema, `border-color-alternative` no tema escuro usa `gray-20` (10.4:1) em vez disso. Se você consumir os tokens 4.x direto, use `--br-color-border-primary` em campos no tema escuro.

## Teste mínimo antes de publicar

1. Percorra a tela só com `Tab` / `Shift+Tab` — o foco é sempre visível?
2. Zoom 200%: nada some, nenhuma rolagem horizontal.
3. NVDA (gratuito, Windows) numa tela crítica: os campos são anunciados com nome, tipo e estado?
4. Force um erro de validação: o leitor anuncia sem que você navegue até o campo?

---

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
