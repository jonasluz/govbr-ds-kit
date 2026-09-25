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
