Campo de texto. É o componente mais exposto de um serviço público — a maior parte do que o cidadão faz é preencher formulário.

## O que o consumidor fornece

O `id` do campo, o texto do rótulo, o `type`/`inputmode` corretos, a ajuda opcional e a mensagem de erro. O componente não valida nada por conta própria.

## Anatomia

Rótulo (`label`, peso 600) → campo (altura 40px, `rounder-sm`, borda `width-sm` em `border-color-alternative`) → feedback (`small`, em `color-secondary`; em erro, `danger` e peso 600).

## Regras

- **Todo campo tem `<label for>`.** Placeholder não é rótulo: some ao digitar, tem contraste baixo e leitores de tela não o anunciam de forma confiável. Use placeholder só para exemplo de formato ("00000.000000/0000-00").
- Obrigatoriedade em **texto** no rótulo — "(obrigatório)". Asterisco vermelho sozinho falha para quem não distingue a cor.
- Ajuda e erro ligados por `aria-describedby`; campo inválido com `aria-invalid="true"`; mensagem de erro com `role="alert"` para ser anunciada sem navegação.
- Erro diz o que houve **e** o que fazer. "O CPF informado não tem 11 dígitos. Confira e digite novamente." Nunca "Campo inválido".
- Valide ao sair do campo (`blur`), não a cada tecla. Um erro que aparece enquanto a pessoa ainda digita é ruído.
- Largura do campo sugere o tamanho do conteúdo: CEP curto, endereço largo. Campo de 100% para tudo é desleixo.
- Espaço entre campos: `spacing-2x`.
- Desabilitado só quando o valor vem do sistema — e diga de onde vem, na ajuda.

## Acessibilidade

`inputmode="numeric"` em CPF, CEP e protocolo poupa o teclado do celular. Nunca `maxlength` sem avisar. Autocomplete padrão (`autocomplete="name"`, `"email"`, `"tel"`) reduce erro e é exigência de boa prática — preencha-o.

## No código

```html
<div class="br-input">
  <label for="cpf">CPF (obrigatório)</label>
  <input id="cpf" type="text" inputmode="numeric" aria-describedby="cpf-ajuda" />
  <span class="feedback" id="cpf-ajuda">Somente números.</span>
</div>
```

Campos com máscara, contador ou botão de senha no core 3.x precisam de `new BRInput(...)` — ou de `core-init.min.js`.
