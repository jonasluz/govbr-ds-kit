Fecha toda página de serviço. Carrega o que a lei e a política de governo digital exigem que esteja acessível de qualquer página.

## O que o consumidor fornece

As colunas de links do órgão, a assinatura e o texto de licença.

## O que não é opcional

- **Acesso à informação** e **Ouvidoria** — exigências da Lei 12.527/2011 e do Decreto 9.492/2018.
- **Acessibilidade** — declaração e canal de contato.
- **Termos de uso** e **política de privacidade** (LGPD).
- **Licença do conteúdo** — Creative Commons Atribuição-SemDerivações 3.0, salvo exceção documentada.

## Regras

- Fundo `surface-header` com texto branco nos dois temas: o rodapé não inverte no tema escuro, ele já é escuro.
- Links sublinhados. No fundo escuro, sublinhado é o que distingue link de texto sem depender da cor.
- Até três ou quatro colunas. Mais do que isso vira mapa do site — e aí faça um mapa do site.
- Sem redes sociais do órgão misturadas aos canais oficiais de atendimento: são coisas diferentes.
- `rounder-none` — o rodapé é faixa de largura total.

## Acessibilidade

`<footer>` (contentinfo implícito) com as colunas em `<nav>` rotuladas por `aria-label`. O rodapé é o destino do quarto atalho do `br-skiplink` — mantenha o `id="footer"`.

## No código

```html
<footer class="br-footer" id="footer">
  <div class="container-lg">…</div>
</footer>
```
