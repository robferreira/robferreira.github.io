# Robinson Ferreira — Site pessoal

Portfólio e site pessoal hospedado no [GitHub Pages](https://pages.github.com/), com versão em português e inglês.

**Site:** [https://robinsonferreira.com.br](https://robinsonferreira.com.br)  
**Repositório:** [robferreira/robferreira.github.io](https://github.com/robferreira/robferreira.github.io)

## O que tem no site

- **Home** — apresentação, idade dinâmica e typewriter (Dados & IA)
- **Sobre** — biografia e cards de competências em carrossel
- **Experiência** — timeline profissional interativa
- **Blog** — preview dos artigos do Medium (atualização automática via RSS)
- **Depoimentos** — marquee + formulário (Formspree), colapsável
- **Contato** — formulário e redes sociais

## Stack

Site estático (HTML, CSS, JavaScript). Sem framework de build obrigatório para servir as páginas.

| Parte | Tecnologia |
| --- | --- |
| UI | HTML + Bootstrap (legado) + tema em `css/theme-modern.css` |
| i18n | PT/EN em `js/i18n/` |
| Blog | RSS do Medium → `scripts/fetch-medium-posts.mjs` |
| Depoimentos | Formspree (`js/config/testimonials.config.js`) |
| Contato | formulário próprio + Formspree (conforme config) |
| CI | GitHub Actions (atualização dos posts do Medium) |

## Estrutura

```text
├── index.html                 # Página principal
├── blog/                      # Página auxiliar do blog (se houver)
├── css/                       # Estilos (inclui theme-modern.css)
├── js/
│   ├── i18n/                  # Traduções e troca de idioma
│   ├── blog/                  # Cards e preview do Medium
│   ├── testimonials/          # Marquee + formulário
│   ├── timeline/              # Experiência profissional
│   └── config/                # Endpoints (Formspree, etc.)
├── data/medium-posts.json     # Snapshot dos artigos do Medium
├── scripts/fetch-medium-posts.mjs
└── .github/workflows/         # Update Medium posts
```

## Desenvolvimento local

Requisitos: Node.js 20+ (só necessário para atualizar o blog).

```bash
# Clonar
git clone https://github.com/robferreira/robferreira.github.io.git
cd robferreira.github.io

# Servir o site (qualquer servidor estático)
# Exemplos:
npx serve .
# ou
python -m http.server 8080
```

Abra `http://localhost:3000` (ou a porta do servidor) e navegue pelo `index.html`.

### Atualizar artigos do Medium

```bash
npm ci
npm run fetch:medium
```

Isso regenera `data/medium-posts.json` e `js/blog/posts-data.js` a partir do feed  
`https://medium.com/feed/@robinson_ferreira` (até 6 posts mais recentes).

No GitHub, o workflow **Update Medium posts** roda:

- diariamente (cron)
- em push na `master`
- manualmente (`workflow_dispatch`)

## Configuração

- **Domínio:** arquivo `CNAME` → `robinsonferreira.com.br`
- **Depoimentos:** endpoint Formspree em `js/config/testimonials.config.js`
- **Idioma:** detectado pelo navegador / `localStorage`; troca pelo seletor PT/EN no menu

## Branches

- `master` — branch publicada no GitHub Pages
- `feat/*` / `develop` — desenvolvimento e PRs

## Licença

Conteúdo e código do site pessoal de Robinson Ferreira. Uso do repositório conforme as regras do GitHub para sites pessoais.
