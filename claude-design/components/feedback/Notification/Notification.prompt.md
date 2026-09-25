Mensagem flutuante temporária que notifica o usuário sobre status, erro ou aviso. Desaparece automaticamente após 3-5 segundos.

## Variantes

- **Sucesso**: fundo `interactive-alternative` (verde), ícone ✓
- **Erro**: fundo vermelho, ícone ✕
- **Aviso**: fundo `warning` (amarelo), ícone ⚠️
- **Info**: fundo `interactive` (azul), ícone ℹ️

## Uso

```javascript
function showNotification(type, title, message) {
  const toast = document.createElement('div')
  toast.className = `notification notification-${type}`
  toast.textContent = `${title}: ${message}`
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 5000)
}
```

## Regras

- Título curto (1 linha), mensagem opcional (1-2 linhas).
- Posicione no canto inferior direito ou superior.
- Auto-desapareça após 3-5 segundos.
- Nunca bloqueie navegação.
- Máx. 3 notificações simultâneas.
