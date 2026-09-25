Caixa de diálogo modal que sobrepõe o conteúdo e bloqueia interação com a página até ser fechada. Use para confirmações, alertas e formulários críticos.

## Estrutura

```html
<dialog class="br-modal">
  <h2>Título da confirmação</h2>
  <p>Descrição ou pergunta.</p>
  <div>
    <button class="br-button secondary" onclick="this.closest('dialog').close()">Cancelar</button>
    <button class="br-button primary" onclick="this.closest('dialog').close()">Confirmar</button>
  </div>
</dialog>

<script>
document.getElementById('trigger').addEventListener('click', () => {
  document.querySelector('.br-modal').showModal()
})
</script>
```

## Regras

- Use `<dialog>` nativo — é a semântica correta.
- `.showModal()` bloqueia a página; `.show()` não bloqueia.
- Sempre título (`<h2>`) claro e ação descrita.
- Botões: cancelar à esquerda, confirmar/ação à direita.
- Nunca force interação — deixe ESC fechar.

## Acessibilidade

- `<dialog>` gerencia foco automaticamente.
- Título descritivo — leitores de tela anunciam o diálogo.
- Botões com `aria-label` se necessário.
