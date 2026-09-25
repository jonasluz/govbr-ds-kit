Ação que o cidadão executa. É pílula (`rounder-pill`) — arredondar só os cantos descaracteriza o padrão.

## Variantes

| Classe | Quando |
|---|---|
| `primary` | a ação que conclui a tarefa da tela. **Uma por tela.** `interactive` com `on-interactive`. |
| `secondary` | alternativa de mesmo peso ("Salvar rascunho"). Fundo da página com borda `width-md` em `interactive`. |
| `tertiary` | ação de baixo peso: cancelar, voltar, limpar. Sem fundo nem borda. |
| `cta` | a ação principal do **serviço** (o verde do gov.br): "Iniciar", "Solicitar". No máximo uma na página, geralmente na entrada. |

Tamanhos: `small` (32px), padrão (40px), `large` (48px). `block` ocupa a largura do contêiner — use em formulário de coluna única no celular.

## O que o consumidor fornece

O texto do botão, o `type` correto (`submit`, `button`, `reset`) e o manipulador. O botão não gerencia estado próprio.

## Regras

- Texto é **frase verbal específica** em caixa de frase: "Enviar solicitação", não "Enviar", nunca "OK" nem "Clique aqui".
- Ordem: ação destrutiva ou de saída à esquerda, ação principal à direita, em telas ≥576px. No celular, empilhe com a principal em cima.
- Ícone só quando acrescenta sentido, sempre com `aria-hidden="true"`. Botão só de ícone exige `aria-label`.
- Desabilitado usa `opacity-md` e **não** perde a ordem de foco por conta própria — se o botão está desabilitado, explique por quê em texto ao lado.
- Nunca escreva `color: #fff` num botão: use `on-interactive`, que inverte no tema escuro.
- Nunca use um botão para navegar entre páginas — isso é um link.

## Acessibilidade

Sempre `<button>`, nunca `<div>` com `onclick`. Foco é `focus-color` tracejado, `width-lg`, deslocado `spacing-half` — não remova. Alvo de toque mínimo de 44×44px: o botão `small` só em barra de ferramentas densa, nunca como ação principal no celular.

## No código

```html
<button class="br-button primary" type="submit">Enviar solicitação</button>
<button class="br-button secondary" type="button">Salvar rascunho</button>
```

O `br-button` do core 3.x é só CSS — não precisa de instanciação JavaScript.
