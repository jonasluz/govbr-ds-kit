Controle binário ON/OFF. Use para habilitar/desabilitar uma opção ou funcionalidade.

## Estrutura

```html
<label>
  <input type="checkbox" class="br-switch" aria-label="Descrição">
  <span>Rótulo da opção</span>
</label>
```

## Regras

- Sempre `<label>` com texto ao lado — nunca switch sozinho.
- `checked` para estado inicial ativado.
- `disabled` para desabilitar sem remover.
- Não use para escolha entre opções múltiplas — use radio ou select.

## Acessibilidade

- `aria-label` quando o texto não é suficiente.
- Foco visível — nunca remova o outline.
