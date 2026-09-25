Campo de texto multi-linha para mensagens, comentários, descrições longas.

## Estrutura

```html
<label for="msg">Sua mensagem:</label>
<textarea 
  id="msg"
  class="br-input"
  placeholder="Digite aqui..."
  rows="4"
  maxlength="500"
></textarea>
```

## Regras

- `<label for="campo-id">` sempre presente.
- `placeholder` é dica, não instrução — coloque a instrução real antes.
- `rows="4"` define altura inicial (aprox. 4 linhas).
- `maxlength` limita caracteres; combine com contador visual.
- `resize` pode ser `vertical` (altura flexível) ou `none` (fixa).

## Comportamento

- Quebras de linha e espaços são preservados.
- Redimensionável por padrão (canto inferior direito).
- Foco e validação funcionam como `<input>`.

## Acessibilidade

- `<label>` associado com `for="id"` — essencial.
- Contador de caracteres em `aria-live="polite"` quando presente.
