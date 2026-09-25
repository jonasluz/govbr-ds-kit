Escolha visível: `br-checkbox` (quadrado, múltipla) e `br-radio` (disco, exclusiva). A forma carrega o sentido — quadrado aceita várias, disco aceita uma. Nunca troque.

## O que o consumidor fornece

As opções com `id` e `name`, o rótulo de cada uma, a legenda do grupo e o estado inicial.

## Regras

- Grupo sempre em `<fieldset>` com `<legend>`. Sem isso, o leitor de tela anuncia opções soltas, sem dizer de que pergunta são.
- Rádio é **exclusivo e sem volta**: se a pessoa pode não escolher nenhuma, inclua a opção "Nenhuma" / "Não quero" explicitamente, ou use checkboxes.
- Nunca pré-marque um rádio numa pergunta que tem consequência (consentimento, forma de pagamento, opção de recurso). Pré-marcação vira resposta acidental.
- Aceite de termos é **um checkbox**, nunca pré-marcado, com o texto completo do que se aceita — ou link para ele.
- Alvo de toque: a linha inteira (rótulo incluído) é clicável, altura mínima 32px, com `spacing-half` entre as opções.
- Até cerca de 7 opções, mostre todas. Acima disso, `Select`.
- Marcado é `interactive` com a marca em `on-interactive` — e a marca (✓ ou disco) existe além da cor.

## Acessibilidade

`<input type="checkbox">` / `<input type="radio">` reais, com `<label for>`. Setas percorrem o grupo de rádios; `Espaço` alterna. Estado indeterminado (`indeterminate`) só em checkbox de "selecionar todos", e precisa de `aria-checked="mixed"`.

## No código

```html
<fieldset>
  <legend>Forma de contato</legend>
  <div class="br-radio"><input id="c-email" type="radio" name="contato" /><label for="c-email">E-mail</label></div>
  <div class="br-radio"><input id="c-tel" type="radio" name="contato" /><label for="c-tel">Telefone</label></div>
</fieldset>
```
