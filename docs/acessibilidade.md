# Acessibilidade

Serviços do Governo Federal têm obrigação legal de acessibilidade
(Lei 13.146/2015, Decreto 5.296/2004, eMAG). O DS ajuda, mas **não garante** —
a marcação errada anula o componente certo.

## O que o DS já entrega

- Contraste dos tokens semânticos calibrado para WCAG 2.1 AA (com um desvio conhecido — abaixo)
- Componentes com `role` e `aria-*` corretos, quando usados com a marcação documentada
- Skiplinks (`br-skiplink`) com `accesskey`
- Modo de alto contraste (`contrast-mode.css`) e seletor no header
- Foco visível via `--br-state-focus-color-main` (laranja, para contrastar com o azul de marca)

## O que é responsabilidade do projeto

**Formulários**

- Todo campo tem `<label for="id">`. *Placeholder não é label.*
- Ajuda e erro ligados por `aria-describedby`.
- Erro anunciado: `role="alert"` ou `aria-live="assertive"`.
- Campo inválido: `aria-invalid="true"`.
- Agrupamentos em `<fieldset>` com `<legend>`.

**Navegação por teclado**

- Ordem do DOM = ordem visual. Nunca use `tabindex` positivo.
- Modal e menu devolvem o foco ao elemento que os abriu.
- Nada só acessível por hover.

**Conteúdo**

- Um `<h1>` por página; hierarquia sem pular níveis.
- `alt` descritivo; `alt=""` em imagem decorativa.
- Link com texto que faz sentido fora de contexto — não "clique aqui".
- Não comunique estado só por cor (ex.: erro precisa de ícone ou texto, além do vermelho).

## Verificação automática

```bash
npm run check:contrast
```

Resolve os tokens reais dos arquivos versionados e compara com os mínimos:
4.5:1 para texto, 3:1 para texto grande e componentes de interface (SC 1.4.11).

Cobre cor. **Não cobre** ordem de foco, nomes acessíveis, leitor de tela nem
compreensão — isso exige teste manual.

## Desvio conhecido nos tokens oficiais

No tema escuro da v4, `--br-color-border-secondary` (#757575) sobre
`--br-color-background-main-primary` (#2d2e2f) dá **2.95:1**, 0.05 abaixo do
mínimo de 3:1 para componentes de interface. Em campos de formulário no tema escuro,
use `--br-color-border-primary`. Registrado em `docs/contraste-desvios.json`.

## Teste manual mínimo antes de publicar

1. Percorra a tela inteira só com `Tab` / `Shift+Tab` — o foco é sempre visível?
2. Zoom 200%: nada some, nenhuma rolagem horizontal.
3. NVDA (Windows, gratuito) numa tela crítica: os campos são anunciados com nome e estado?
4. Simule erro de validação: o leitor de tela anuncia sem que você precise navegar até o campo?
