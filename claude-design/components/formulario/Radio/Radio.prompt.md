Controle de seleção exclusiva. O usuário escolhe uma opção entre várias, e a seleção anterior é automaticamente desmarcada.

## Estrutura

```html
<fieldset>
  <legend>Qual é sua categoria?</legend>
  <label>
    <input type="radio" name="categoria" value="pf" class="br-radio">
    Pessoa Física
  </label>
  <label>
    <input type="radio" name="categoria" value="pj" class="br-radio">
    Pessoa Jurídica
  </label>
</fieldset>
```

## Regras

- **Sempre `<fieldset>` + `<legend>`** — agrupa radios relacionados.
- Todos os `<input type="radio">` do grupo compartilham o mesmo `name`.
- `value` identifica qual opção foi escolhida.
- `<label>` para cada radio — nunca deixe sem.
- `disabled` desabilita uma opção sem removê-la da tela.

## O que o consumidor fornece

- Lista de opções (labels e valores).
- Qual opção é selecionada por padrão (com `checked`).
- Manipulador `onchange` se precisar reagir.

## Acessibilidade

- `<fieldset>` + `<legend>` explica o propósito do grupo.
- `<label>` aumenta a área de clique (conforto em celular).
- Navegação por setas (↑ ↓) — nativa do navegador.
