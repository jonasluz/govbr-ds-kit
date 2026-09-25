Página de abertura ou capa da marca. Exibe a logomarca da instituição, título do serviço e mensagem de boas-vindas, normalmente centrada na altura total da janela.

## Estrutura

- **Logo**: imagem da instituição — no gov.br, a assinatura em branco sobre fundo azul (`interactive`).
- **Título**: `h1` em `text-body-xl` ou maior, descrevendo o serviço.
- **Descrição**: texto complementar em `color-secondary` explicando o objetivo ou o próximo passo.
- **CTA**: botão principal (`cta`) com a ação que inicia o fluxo do serviço.

## O que o consumidor fornece

- URL/SVG da logo
- Título e descrição do serviço
- Referência para o botão de ação

## Regras

- Fundo: sempre `background` do tema ativo (não codifique `#fff` ou `#1a1a1a`).
- Logo não tem `alt` (é decorativa para acessibilidade; o `h1` cumpre esse papel).
- Conteúdo verticamente centralizado com `min-height: 100vh` no contêiner externo.
- Nunca copie a assinatura do gov.br — use a logomarca de sua instituição.
- O botão CTA deve ser visível e de tamanho adequado (ao menos `large`).

## Acessibilidade

- `h1` deve descrever o serviço (não seja genérico como "Bem-vindo").
- Descrição em `color-secondary` é legível (mínimo 4.5:1 sobre `background`).
- Botão com `aria-label` se o texto é muito curto ou ambíguo.

## No código

```html
<div style="background: var(--background); color: var(--color); min-height: 100vh; display: flex; align-items: center; justify-content: center;">
  <div class="text-center">
    <img src="/logo.svg" style="max-width: 200px; margin-bottom: 2rem;">
    <h1 class="text-body-xl" style="color: var(--interactive); margin-bottom: 1rem;">Solicitação de Documento</h1>
    <p class="text-body color-secondary" style="max-width: 400px; margin-bottom: 2rem;">Preencha seus dados para solicitar uma certidão de nascimento, casamento ou óbito.</p>
    <button class="br-button cta large" type="button">Iniciar Solicitação</button>
  </div>
</div>
```

A capa usa apenas classes do core 3.x e CSS variables — é agnóstica ao tema.
