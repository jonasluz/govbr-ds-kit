Trilha de navegação que mostra a posição do usuário na hierarquia do site. Cada item é um link para subir um nível, exceto o último que indica a página atual.

## Estrutura

```html
<nav class="br-breadcrumb" aria-label="Trilha de navegação">
  <ol>
    <li><a href="/">Início</a></li>
    <li>›</li>
    <li><a href="/servicos">Serviços</a></li>
    <li>›</li>
    <li aria-current="page">Página Atual</li>
  </ol>
</nav>
```

## Regras

- Use `<nav>` com `aria-label="Trilha de navegação"`.
- Items são links até o penúltimo; o último é `aria-current="page"`.
- Separador (›, →, /) em `color-secondary`, sem interatividade.
- Quebre em várias linhas em mobile — flexbox com `flex-wrap: wrap`.
- Links válidos sempre — nunca `href="#"` vazio.

## Acessibilidade

- `aria-label` no `<nav>` identifica a seção.
- `aria-current="page"` marca a página atual.
- Ordem lógica: Início > Seção > ... > Página Atual.
