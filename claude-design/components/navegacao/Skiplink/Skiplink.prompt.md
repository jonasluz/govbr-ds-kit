Atalho de navegação invisível que pula para o conteúdo principal. Fica oculto até receber foco do teclado.

## Uso

Sempre como **primeiro elemento interativo** da página, logo após `<body>`:

```html
<a href="#main" class="br-skiplink">Ir para o conteúdo principal</a>
```

Depois, marque o início do conteúdo principal:

```html
<main id="main">...</main>
```

## Regras

- Posicionar no topo (não em camadas, não em modal).
- `href` aponta para `id="main"` ou equivalente.
- Texto descritivo: "Ir para o conteúdo principal", não genérico.
- Não remova e não mude a classe `br-skiplink` — ela controla a visibilidade.

## Acessibilidade

É essencial para navegação por teclado. Leitores de tela leem o link mesmo quando invisível, tornando a página usável sem mouse.
