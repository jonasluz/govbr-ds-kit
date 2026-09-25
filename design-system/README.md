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
