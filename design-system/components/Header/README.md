Faixa de identificação no topo de toda página de serviço. É o que diz ao cidadão que ele está num site do Governo Federal — por isso é o componente com menos margem de personalização.

## O que o consumidor fornece

A assinatura do órgão, o nome e a descrição do sistema, os itens de menu e o estado de autenticação.

## Anatomia

1. **Faixa institucional** (`surface-header`, texto branco): marca gov.br, divisor, assinatura do órgão; à direita, recursos de acessibilidade (incluindo alto contraste) e entrada pela conta gov.br.
2. **Topo do sistema**: gatilho do menu, nome do sistema (`h4`) e descrição curta (`small`).
3. **Trilha de navegação** (`br-breadcrumb`), quando a página não é a inicial.

## Regras

- A faixa institucional **não muda de cor por órgão**. A identidade do órgão entra na assinatura, não na paleta.
- Nome do sistema é o nome que o cidadão conhece, não a sigla interna. "Sistema Eletrônico de Informações", com "SEI" em seguida se necessário.
- Entrada sempre pela **conta gov.br** — não construa login próprio para serviço ao cidadão.
- O seletor de alto contraste fica no cabeçalho e é **obrigatório**. Não o remova para limpar a interface.
- `data-sticky` fixa o cabeçalho ao rolar; use em página longa de formulário, com `elevation-2` ao descolar do topo.
- Os atalhos de navegação (`br-skiplink`) vêm **antes** do cabeçalho no DOM. É o primeiro `Tab` da página.

## Acessibilidade

`<header>` com o `role` implícito de banner; menu em `<nav>` com `aria-label`; trilha em `<nav aria-label="Você está aqui">` com `aria-current="page"` no item atual. O gatilho do menu precisa de `aria-expanded` e `aria-controls`, e o menu devolve o foco a ele ao fechar. Isso vem do `core-init.min.js` — o cabeçalho **não funciona sem o JavaScript do DS**.

## No código

```html
<header class="br-header" id="header" data-sticky>
  <div class="container-lg">
    <div class="header-top">…</div>
    <div class="header-bottom">…</div>
  </div>
</header>
```
