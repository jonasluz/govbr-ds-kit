Barra horizontal de links principais de navegação. Geralmente abaixo do cabeçalho (`<header>`), antes do conteúdo principal.

## Estrutura

```html
<nav class="br-menu">
  <ul>
    <li><a href="/">Início</a></li>
    <li><a href="/servicos">Serviços</a></li>
    <li><a href="/sobre">Sobre</a></li>
  </ul>
</nav>
```

## Estilo

- Fundo: `--interactive` (azul gov.br).
- Texto: `--on-interactive` (branco/claro).
- Item ativo: borda inferior em `--on-interactive`.

## Regras

- **Links, nunca botões** — navegação é `<a>`, não `<button>`.
- Máx. 5-7 itens principais — itens extras vão em dropdown ou menu lateral.
- Em mobile, horizontal com scroll ou menu hambúrguer.
- Foco visível (outline) essencial para teclado.

## Acessibilidade

- `<nav>` marca a seção de navegação.
- Ordem: itens em `<ul>` (lista ordenada ou não, conforme necessário).
- Item ativo: use `aria-current="page"` além da borda visual.
