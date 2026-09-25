Retorno do sistema sobre o que aconteceu ou está por acontecer. Fica no fluxo da página, junto do que descreve — não flutua.

## O que o consumidor fornece

O tipo, o título (uma frase), o corpo e, quando cabível, a ação de fechar.

## Os quatro tipos

| Tipo | Quando | `role` |
|---|---|---|
| `success` | a ação concluiu. Inclua o que foi gerado — protocolo, número, prazo. | `status` |
| `info` | contexto útil antes de agir. | `status` |
| `warning` | algo que exige atenção mas não impede: prazo, dado desatualizado. | `status` |
| `danger` | a ação falhou ou não pode prosseguir. | `alert` |

`alert` interrompe o leitor de tela; `status` espera a pausa. Erro usa `alert`; os outros três, `status`. Usar `alert` em tudo treina a pessoa a ignorar.

## Regras

- **Ícone e texto, sempre** — a cor sozinha não comunica. `warning` é o caso extremo: amarelo puro não é cor de texto em tema nenhum, então o ícone fica em `color` e o amarelo vive só na borda.
- Título é uma frase que diz o resultado: "Solicitação enviada.", "Não foi possível enviar." Nunca "Sucesso!" nem "Erro".
- Erro diz **o que fazer**: qual campo, qual formato, qual próximo passo.
- Uma mensagem por vez no topo do conteúdo. Erros de campo ficam no campo; a mensagem de topo resume e aponta.
- Fechável só quando é informação passageira. Erro que bloqueia não fecha.
- `info` usa a mesma cor da ação primária — não a deixe parecer clicável.

## Acessibilidade

A região de mensagem existe no DOM **antes** do erro acontecer (vazia), para que o leitor anuncie a inserção. Após enviar um formulário com erro, mova o foco para a mensagem de topo. Nunca dependa só de rolagem.

## No código

```html
<div class="br-message danger" role="alert">
  <div class="icon"><i class="fas fa-times-circle fa-lg" aria-hidden="true"></i></div>
  <div class="content">
    <span class="message-title">Não foi possível enviar.</span>
    <span class="message-body">O CPF informado não tem 11 dígitos.</span>
  </div>
</div>
```
