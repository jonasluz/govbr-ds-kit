Dica flutuante que aparece ao passar o mouse ou receber foco. Use para esclarecer ícones ou termos técnicos brevemente.

## Uso simples (nativo)

```html
<button title="Explique a ação aqui">ℹ️</button>
```

O navegador exibe uma tooltip automática ao passar o mouse.

## Uso avançado (custom)

```html
<button aria-label="Informação sobre este campo" onmouseover="showTooltip()">?</button>
<div id="tip" style="display: none; background: var(--interactive); color: white; padding: 0.5rem;">Dica aqui</div>
```

## Regras

- Texto **breve**: máx. 1-2 linhas. Senão, use um modal ou seção de ajuda.
- Apareça ao **mouse over** E ao **keyboard focus** (Tab).
- Desapareça ao mouse out ou blur.
- Nunca bloqueie o elemento — posicione fora.
- Nunca coloque interatividade dentro (links, botões).

## Acessibilidade

- Use `title=""` ou `aria-label=""` — leitores de tela leem.
- Keyboard users precisam receber foco para ver a dica.
