Controle para envio de arquivo. Permite usuário selecionar e submeter documentos.

## Estrutura

```html
<label for="doc">Escolha o arquivo:</label>
<input 
  type="file" 
  id="doc"
  class="br-upload"
  accept=".pdf,.jpg,.png"
  aria-label="Enviar documento"
>
```

## Regras

- `<label>` sempre presente e descritiva.
- `accept` restringe tipos de arquivo.
- `multiple` permite vários arquivos simultaneamente.
- Sempre exiba limite de tamanho visualmente.
- Forneça feedback sobre upload em progresso.
- Validação deve ocorrer antes de envio.

## O que o consumidor fornece

- Texto descritivo do campo
- Tipos aceitos (extensões)
- Limite de tamanho
- Manipulador `onchange` ou `on submit`
