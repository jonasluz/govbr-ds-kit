Escolha de uma ou mais opções em lista. No core 3.x o `br-select` **não é um `<select>` nativo**: é um campo somente-leitura mais uma lista de `br-radio` (escolha única) ou `br-checkbox` (múltipla), montada pelo JavaScript do DS.

## O que o consumidor fornece

As opções, o rótulo, o valor inicial e o manipulador de mudança. A abertura, o fechamento e a navegação por teclado são do componente — **e só funcionam com o JavaScript do DS carregado.**

## Quando usar outra coisa

- **Até 5 opções visíveis o tempo todo:** use `br-radio` em `fieldset` — menos cliques, tudo à vista.
- **Duas opções mutuamente exclusivas:** use `br-switch` ou dois rádios.
- **Lista longa com busca (municípios, órgãos):** `br-select` com filtro, ou um campo com autocomplete.
- **Escolha múltipla de poucas opções:** `br-checkbox`, não select múltiplo.

## Regras

- O campo fechado mostra o valor escolhido, não "Selecione uma opção" depois de escolhido.
- Sem opção pré-selecionada quando a escolha é significativa — pré-seleção vira resposta acidental.
- Ordene por frequência de uso ou alfabeticamente. Nunca por ordem de cadastro no banco.
- Lista aberta usa `elevation-3` e nunca ultrapassa a altura da janela: role dentro da lista.
- Item selecionado usa `selected` com texto branco (4.5:1) e **também** uma marca — não só a cor.

## Acessibilidade

O campo precisa de `role="combobox"`, `aria-expanded` e `aria-controls`; a lista, `role="listbox"` com `role="option"` e `aria-selected` nos itens. `Esc` fecha e devolve o foco ao campo; setas percorrem as opções. O `core-init.min.js` faz isso — se você reimplementar, refaça tudo.

## No código

```html
<div class="br-select">
  <div class="br-input">
    <label for="uf">Unidade da Federação</label>
    <input id="uf" type="text" placeholder="Selecione" readonly />
    <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1"><i class="fas fa-angle-down" aria-hidden="true"></i></button>
  </div>
  <div class="br-list" tabindex="0"><!-- br-item com br-radio --></div>
</div>
```
