Linha separadora entre seções. Organiza visualmente e estabelece hierarquia.

## Uso simples

```html
<hr style="border: none; border-top: 1px solid var(--border-color);">
```

## Com rótulo

```html
<div style="display: flex; align-items: center; gap: 1rem;">
  <hr style="flex: 1; border: none; border-top: 1px solid var(--border-color);">
  <span>OU</span>
  <hr style="flex: 1; border: none; border-top: 1px solid var(--border-color);">
</div>
```

## Regras

- Use `<hr>` semântico (não `<div>`).
- Cor: sempre `--border-color`.
- Espaçamento: `margin: 1rem 0` (mínimo).
- Nunca use decorativamente — separa conteúdo realmente distinto.
