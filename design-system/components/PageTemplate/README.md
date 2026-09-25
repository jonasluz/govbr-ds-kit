Template completo de página de serviço gov.br, do topo até o rodapé, demonstrando a estrutura semântica recomendada e como os componentes trabalham juntos.

## Estrutura recomendada

**Ordem de elementos da página:**

1. **Skiplink** — invisível, atalho para `#main`
2. **Header** — logomarca e título do serviço
3. **Menu de navegação** — links principais
4. **Breadcrumb** — trilha de navegação
5. **Main content** — conteúdo único da página
   - Heading (`<h1>`)
   - Formulário ou conteúdo principal
   - Componentes (Button, Input, Select, Checkbox, Message, etc.)
6. **Footer** — informações legais e links secundários

## Padrão de formulário

```html
<form>
  <div class="form-group">
    <label for="campo">Rótulo:</label>
    <input type="text" id="campo" class="br-input" required>
  </div>
  
  <fieldset>
    <legend>Opção múltipla:</legend>
    <label><input type="radio" name="op"> Opção 1</label>
    <label><input type="radio" name="op"> Opção 2</label>
  </fieldset>
  
  <label>
    <input type="checkbox"> Concordo com os termos
  </label>
  
  <div class="actions">
    <button class="br-button secondary" type="reset">Cancelar</button>
    <button class="br-button primary" type="submit">Enviar</button>
  </div>
</form>
```

## Regras

- **Semântica HTML** — use `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`.
- **Acessibilidade** — labels para todos os campos, headings em ordem, skiplink obrigatório.
- **Responsividade** — flexbox/grid para layouts em mobile.
- **Foco em conteúdo** — o serviço é a página, não distrações.

## Temas

A página segue `data-theme="claro"` por padrão. Mude para `data-theme="escuro"` para tema escuro — todos os tokens se adaptam automaticamente.

## O que não fazer

- ❌ Nunca pule o skiplink
- ❌ Nunca deixe campo sem `<label>`
- ❌ Nunca use cores hardcoded (`#fff`, `#1a1a1a`) — sempre CSS variables
- ❌ Nunca remova foco visual dos campos
