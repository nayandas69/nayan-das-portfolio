## 📁 My Structure

This is the directory structure of **nayan-das-portfolio**, a simple portfolio built with Nuxt.

```text
nayan-das-portfolio/
│
├── .gitattributes
├── .gitignore
├── .node-version
├── .nuxtrc
├── .prettierignore
├── .prettierrc.json
├── .dockerignore
├── Dockerfile
├── LICENSE
├── README
├── CLICK-ME.md
├── structure.md
│
├── nuxt.config.ts
├── tsconfig.json
├── vitest.config.ts
│
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
│
├── __tests__/                # Unit tests
│   ├── components/
│   │   ├── AppFooter.test.js
│   │   ├── AppHeader.test.js
│   │   └── ProjectCard.test.js
│   │
│   └── composables/
│       ├── useBlogPosts.test.js
│       ├── useGithubRepos.test.js
│       └── useLanguageList.test.js
│
├── app/
│   ├── app.vue               # Root Vue component
│   ├── error.vue             # Global error page
│   ├── app.config.ts         # App configuration
│   │
│   ├── types/                # Global TypeScript types
│   │   └── index.ts
│   │
│   ├── assets/
│   │   └── scss/             # Global styles
│   │       ├── _mixins.scss
│   │       ├── _shared.scss
│   │       ├── _variables.scss
│   │       └── main.scss
│   │
│   ├── components/           # Reusable Vue components
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   ├── AppNavbar.vue
│   │   ├── ArticlesSection.vue
│   │   ├── ProjectCard.vue
│   │   ├── ProjectsSection.vue
│   │   │
│   │   └── icons/            # SVG icon components
│   │       ├── IconArrow.vue
│   │       ├── IconClock.vue
│   │       ├── IconDiscord.vue
│   │       ├── IconFork.vue
│   │       ├── IconGithub.vue
│   │       ├── IconMail.vue
│   │       ├── IconRepo.vue
│   │       ├── IconStar.vue
│   │       └── IconX.vue
│   │
│   ├── composables/          # Vue composables (logic reuse)
│   │   ├── useBlogPosts.ts
│   │   ├── useGithubRepos.ts
│   │   └── useLanguageList.ts
│   │
│   ├── layouts/              # Nuxt layouts
│   │   └── default.vue
│   │
│   └── pages/                # Nuxt file-based routing
│       ├── index.vue
│       ├── about.vue
│       ├── gallery.vue
│       └── contact.vue
│
└── public/                   # Static assets
    ├── .gitkeep
    ├── robots.txt
    ├── look.png
    └── images/
        └── photo-1.avif
```