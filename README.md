# govbr-ds-kit

Kit de adoção do **Design System do Governo Federal (GOVBR-DS)**.

Este repositório **não é um fork nem uma cópia** do DS oficial. Ele consome os pacotes
publicados no npm, fixa as versões, versiona um snapshot auditável dos tokens e
oferece templates e guias para começar um serviço já conforme o padrão.

| | |
|---|---|
| Site oficial | <https://www.gov.br/ds/> |
| Código-fonte oficial | <https://gitlab.com/govbr-ds> |
| Wiki de desenvolvimento | <https://govbr-ds.gitlab.io/tools/govbr-ds-wiki/> |
| Licença do DS | MIT |

## Versões fixadas

| Pacote | Versão | Papel |
|---|---|---|
| `@govbr-ds/core` | `3.7.0` | CSS + JS de produção (componentes `br-*`, utilitários, templates) |
| `@govbr-ds/tokens` | `4.0.0-next.33` | Tokens estruturados: tema claro/escuro, por componente, Tokens Studio/Figma |

O core 3.7.0 é o que está em produção nos serviços gov.br hoje. Os tokens 4.x são
**pré-release** e entram aqui como fonte de verdade para design (Figma, Claude) e
para preparar a migração — não para substituir o core 3.x em produção ainda.
Ver [`docs/migracao-v3-v4.md`](docs/migracao-v3-v4.md).

## Começando

```bash
npm install
npm run sync:tokens   # regenera tokens/ a partir de node_modules
npm run verify        # confere snapshot + contraste
npm run serve         # http://localhost:4173/templates/base.html
npm run build:claude-design   # regenera claude-design/ a partir de design-system/
```

## Estrutura

```
docs/                    guias de adoção, tokens, acessibilidade e migração
scripts/
  sync-tokens.mjs        copia os tokens do npm para tokens/ (e valida com --check)
  check-contrast.mjs     valida contraste WCAG AA dos pares semânticos
  serve.mjs              servidor estático para abrir os templates
  build-claude-design.mjs  gera claude-design/ a partir de design-system/
templates/
  base.html              shell de página: skiplink, header, menu, breadcrumb, footer
  formulario.html        formulário de serviço com validação e feedback acessíveis
design-system/           a fonte do design system: tokens.json, livro da marca e
                         componentes com preview e diretrizes
claude-design/           o mesmo sistema no layout que o Claude Design consome
                         (gerado — não editar à mão)
tokens/                  snapshot versionado (gerado — não editar à mão)
  v3/css/core-tokens.css tokens do core 3.x
  v4/css|scss|json       tokens 4.x, temas claro/escuro e por componente
  v4/figma/              export Tokens Studio, para o Figma
  MANIFEST.json          o que foi gerado, de quais versões e quando
```

## O design system

`design-system/` é a fonte: `tokens.json` (cor em tema claro e escuro, tipografia,
espaçamento, raio, elevação, opacidade, borda, breakpoints), o livro da marca e
oito componentes com preview e diretrizes. Os valores vêm do `@govbr-ds/core` 3.7.0.

`npm run build:claude-design` compila essa fonte para `claude-design/`, no layout de
dois níveis que o Claude Design consome — `components/<grupo>/<Comp>/<Comp>.html` com
o marcador `@dsCard` na primeira linha, mais `<Comp>.prompt.md` e `_ds_bundle.css`.
Os previews são autocontidos: embutem os tokens compilados, então renderizam mesmo
onde a folha do projeto não for carregada.

Para publicar no Claude Design, a partir deste diretório:

```
/design-login    uma vez, para autorizar
/design-sync     envia claude-design/ para o projeto escolhido
```

## Como este repositório se mantém atualizado

1. `package.json` fixa as versões exatas em `dependencies` e em `govbrDs`.
2. `npm run sync:tokens` regenera `tokens/` — o diff do commit mostra exatamente
   o que mudou entre uma versão do DS e a seguinte.
3. `npm run check:tokens` falha no CI se `tokens/` divergir dos pacotes instalados.
4. O job agendado do CI avisa quando o DS publica versão nova.

## Regras de uso

- **Não edite `tokens/` à mão.** É saída de script; mudanças manuais somem no próximo sync.
- **Não sobrescreva CSS do DS.** Use as classes utilitárias (`mb-3`, `col-md-6`,
  `text-up-01`) e, quando precisar customizar, redefina *custom properties*
  (`--br-*` no v4, `--interactive` e afins no v3) — nunca seletores `.br-*`.
- **Componentes interativos precisam de JS.** Inclua `core-init.min.js` ou instancie
  manualmente (`new BRHeader(...)`) — sem isso, menu, select e tooltip não funcionam.
- **Acessibilidade não é opcional.** Skiplinks, `label` associado a todo campo,
  `role="alert"` em mensagens. Ver [`docs/acessibilidade.md`](docs/acessibilidade.md).

## Desvios conhecidos

`docs/contraste-desvios.json` registra combinações dos tokens oficiais que ficam
abaixo do mínimo WCAG. Elas não derrubam o CI, mas ficam visíveis na saída do
`check:contrast` e devem ser encaminhadas ao upstream.

## Licença

O GOVBR-DS é MIT, do SERPRO / Governo Federal. Este kit é material de apoio e
segue a mesma licença. Os arquivos em `tokens/` são cópias dos pacotes oficiais.
