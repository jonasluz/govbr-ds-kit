Indica ao usuário que algo está sendo processado. Use spinner para operações rápidas (<2s) e barra de progresso para mais longas.

## Variantes

- **Spinner**: ícone animado rotativo — operações rápidas
- **Barra de progresso**: barra horizontal — processos longos com progresso visível

## Uso

```html
<!-- Spinner -->
<span class="spinner" aria-busy="true" aria-label="Carregando"></span>

<!-- Barra -->
<div class="progress-bar">
  <div class="progress" style="width: 65%;"></div>
</div>
```

## Regras

- Sempre `aria-busy="true"` ou `aria-label` para leitores de tela.
- Nunca use por mais de 30 segundos sem feedback.
- Spinner para <2s, barra para operações mais longas.
- Nunca bloqueie totalmente a interface.
