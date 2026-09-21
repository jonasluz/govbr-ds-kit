# Guia de adoção

Como colocar o GOVBR-DS num serviço novo ou existente, em ordem de esforço.

## 1. Página estática ou aplicação server-side (Django, Rails, PHP, .NET)

Caminho mais curto e o mais usado em serviços gov.br.

```bash
npm install @govbr-ds/core@3.7.0
```

No `<head>`:

```html
<link rel="stylesheet" href="https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/fonts/rawline/css/rawline.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900&display=swap" />
<link rel="stylesheet" href="/assets/govbr/core.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
```

Antes de `</body>`:

```html
<script src="/assets/govbr/core-init.min.js"></script>
```

`core-init` instancia automaticamente os componentes presentes na página. Se o
serviço monta HTML dinamicamente, use `core.min.js` e instancie você mesmo
(`new BRSelect('br-select', document.querySelector('.br-select'))`) após inserir o nó.

Sirva `core.min.css` e `core-init.min.js` a partir dos seus próprios assets —
copie de `node_modules/@govbr-ds/core/dist/` no build, não referencie
`node_modules` em produção.

### Escolhendo o bundle

| Arquivo | Quando usar |
|---|---|
| `core.min.css` | padrão: tokens + componentes + utilitários |
| `core-lite.min.css` | sem utilitários, quando você já tem um sistema de layout |
| `core-base.min.css` | só a base; componentes importados um a um de `dist/components/` |
| `core-tokens.min.css` | só as *custom properties*, para aplicar o padrão visual a um app legado |

O último é o caminho para **adotar o DS aos poucos** num sistema existente: carregue
só os tokens, aponte seu CSS atual para eles e vá trocando componente por componente.

## 2. Angular, Vue, React

O DS publica web components (`@govbr-ds/webcomponents`, Stencil) e a comunidade mantém
wrappers (por exemplo `govbr-ds-angular`, da UFU). Para React e Vue, o caminho estável
hoje é consumir o `core` e escrever componentes finos que só aplicam as classes `br-*`
e chamam o JS do DS no ciclo de vida.

A regra vale para qualquer framework: o componente do seu app é uma casca — a marcação
e as classes vêm do DS, para que uma atualização do DS não exija reescrever sua UI.

## 3. Design (Figma)

`tokens/v4/figma/tokens-studio.json` é o export no formato Tokens Studio. No Figma,
plugin Tokens Studio → *Import* → aponte para esse arquivo. Assim o time de design usa
exatamente os mesmos valores que o CSS, versionados no mesmo commit.

O DS também publica UI Kits oficiais em <https://www.gov.br/ds/> (seção *Prototipação*).

## 4. Checklist antes de publicar um serviço

- [ ] Skiplinks funcionam com teclado (`Tab` na primeira interação)
- [ ] Cabeçalho e rodapé seguem o padrão do órgão (assinatura, logo, licença)
- [ ] Todo campo tem `<label for>`; erros usam `role="alert"`
- [ ] Nenhum seletor `.br-*` sobrescrito no CSS do projeto
- [ ] `npm run verify` passa
- [ ] Testado em 360px, 768px e 1280px
- [ ] Testado com zoom de 200% sem rolagem horizontal
- [ ] Testado com leitor de tela (NVDA no Windows) nas telas críticas
