Agrupa informações de **uma** entidade — um serviço, um processo, uma solicitação — com suas ações. É o bloco de listagem do gov.br.

## O que o consumidor fornece

O conteúdo das três regiões (cabeçalho, corpo, rodapé) e as ações. O card não decide navegação.

## Anatomia

`card-header` (título `h4`, tag de estado se houver) → `card-content` (descrição, metadados em `small` / `color-secondary`) → `card-footer` (ações). Fundo `background`, `rounder-md`, `elevation-1`.

## Regras

- **Um card, uma entidade.** Se o conteúdo não descreve uma coisa só, é uma seção, não um card.
- Card sobre `background-alternative`, para que o `background` do card se destaque. Card branco sobre fundo branco precisa de borda, não de sombra.
- Numa lista, todos os cards têm a **mesma estrutura**. Campo ausente vira "—" ou some em todos, nunca em alguns.
- Ação no rodapé, no máximo duas: uma primária e uma terciária. Mais que isso, a listagem está fazendo trabalho de página de detalhe.
- **Card inteiro clicável ou botão no rodapé — não os dois.** Um link dentro de uma área clicável é armadilha de teclado e de leitor de tela.
- Estado do processo é tag com ícone ou ponto **e** palavra. "Concluído" com um ponto verde, não um ponto verde sozinho.
- `elevation-1` em repouso; `elevation-2` no hover só quando o card inteiro é clicável — sombra que muda sem que nada seja clicável mente sobre a interação.

## Acessibilidade

Título do card em nível de cabeçalho coerente com a página (dentro de uma seção com `h2`, o card usa `h3`). Card clicável é `<a>` envolvendo o título, não um `onclick` na `div` — assim funciona com teclado, com "abrir em nova aba" e é anunciado como link.

## No código

```html
<div class="br-card">
  <div class="card-header"><div class="br-card-header"><strong>Título</strong></div></div>
  <div class="card-content">…</div>
  <div class="card-footer"><button class="br-button primary" type="button">Solicitar</button></div>
</div>
```
