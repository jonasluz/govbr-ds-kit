# Convenções do GovBR-DS

## Setup e Wrapping

Os componentes do GovBR-DS são componentes web do `@govbr-ds/core` v3.7.0 — HTML/CSS/JS vanilla, sem React.

Para usar em uma página:

1. Inclua o CSS dos tokens:
   ```html
   <link rel="stylesheet" href="_ds_bundle.css">
   ```

2. Inclua o JS do core:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@govbr-ds/core@3.7.0/dist/core-init.min.js"></script>
   ```

3. Use os componentes diretamente no HTML com as classes `br-*`:
   ```html
   <button class="br-button">Clique aqui</button>
   <input type="text" class="br-input">
   <select class="br-select">...</select>
   ```

O JS de inicialização instancia automaticamente os componentes interativos (menus, selects, tooltips).

## Idioma de Styling

**Não use CSS classes custom.** Os componentes usam:

- **Classes utilitárias do core**: `mb-3`, `mt-2`, `col-md-6`, `text-up-01`, `gap-lg`
- **Custom properties (tokens) CSS**: `--color-primary`, `--spacing-base`, `--border-radius-md`
- **Dados-attributes para tema**: `data-theme="dark"` ou `data-theme="light"`

Exemplo de layout com componentes:
```html
<div class="mb-3 gap-lg">
  <input type="text" class="br-input" placeholder="Nome">
  <button class="br-button">Enviar</button>
</div>
```

## Onde a verdade vive

- **Tokens e estilos**: `_ds_bundle.css` (este arquivo compila todos os tokens em CSS variables)
- **Componentes**: `components/<grupo>/<Nome>/` — veja cada `.prompt.md` para exemplos e props
- **Fonte oficial**: <https://www.gov.br/ds/> e <https://gitlab.com/govbr-ds>

## Temas suportados

O design system suporta tema **claro** (padrão) e **escuro**:

```html
<!-- Ativa tema escuro -->
<html data-theme="dark">
```

Sem `data-theme`, usa o tema claro. Os tokens se adaptem automaticamente via CSS variables.

