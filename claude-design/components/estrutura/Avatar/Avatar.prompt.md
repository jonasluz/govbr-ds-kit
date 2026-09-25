Representa um usuário ou entidade através de imagem redonda ou iniciais. Usado em comentários, perfis, equipes.

## Estrutura

```html
<!-- Com imagem -->
<img src="usuario.jpg" alt="João Luz" style="width: 48px; height: 48px; border-radius: 50%;">

<!-- Com iniciais (SVG ou fundo) -->
<div style="width: 48px; height: 48px; border-radius: 50%; background: #4a90e2; color: white; display: flex; align-items: center; justify-content: center;">
  JL
</div>
```

## Tamanhos

- 24px — contextos densos (listas)
- 32px — padrão
- 48px — destaques
- 64px+ — perfil

## Regras

- Sempre `alt` descritivo na imagem.
- Use iniciais quando imagem não disponível.
- Imagem deve ser quadrada (nunca rectangular).
- Border-radius: 50% para circular.
