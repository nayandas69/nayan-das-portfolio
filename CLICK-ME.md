<div align="center">

![portfolio](https://github.com/nayandas69/nayan-das-portfolio/blob/main/public/look.png?raw=true)

[![CI](https://github.com/nayandas69/nayan-das-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/nayandas69/nayan-das-portfolio/actions/workflows/ci.yml)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.44-green?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.6.3-green?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![SCSS](https://img.shields.io/badge/SCSS-1.106.1-pink?logo=sass&logoColor=white)](https://sass-lang.com/)
[![Production Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)](https://nayan-das-portfolio-navy.vercel.app)
[![Discord](https://img.shields.io/discord/1435329767149797461?label=Join%20Discord&logo=discord&color=5865F2)](https://discord.gg/u9XfHZN8K9)

</div>



## click me, you gonna licks it 👇

aight so listen up real quick no cap 🫠

this ain't your boring template portfolio bro. i built this whole thing from scratch with **Nuxt 4** and it goes stupid hard. like actually licks fr fr.

### what's inside this bad boy

- **Nuxt 4** yeah the latest one, not that old stuff
- **Vue 3** with `<script setup>` clean af composables no cap
- **SCSS** custom design tokens, mixins, the whole drip 🎨
- **GitHub API** pulls my repos live, auto sorts by stars, language colors n everything
- **Local Markdown and MDX** articles live in `content/blog/` and are published at `/blog`.
- **Vitest** tests? yeah i got those too, don't sleep on me 😤
- **Vercel** deployed and buttery smooth

### how it works tho

so basically two composables do the heavy lifting:

- `useGithubRepos` hits the github api, grabs my pinned repos, shows stars forks languages all that good stuff
- `useBlogPosts` reads validated build metadata from repository articles; the home page shows the five newest published posts.

the whole ui is component based `AppHeader`, `AppFooter`, `ProjectCard`, `ProjectsSection`, `ArticlesSection` everything modular and clean. icon components for github, x, discord, mail, all custom svg no library bloat.

### the scss drip

nah fr the styling is lowkey fire. got scss variables for colors, spacing, fonts — dark mode vibes with `#0D0D0D` background and that cyan `#00E5FF` accent hittin different. responsive mixins so it looks clean on your phone too bestie.

### wanna run it locally?

```bash
pnpm install
pnpm dev
```

that's literally it. open `localhost:3000` and vibe.

### wanna test?

```bash
pnpm test
```

vitest handles it, we good.

### wanna dockerize it?

build the image:
```bash
docker build -t nayan-portfolio .
```

run the container:
```bash
docker run -p 3000:3000 nayan-portfolio  #run the container and map port 3000
```

the docker will start the lics server and you can access the portfolio at `http://localhost:3000` in your browser. easy peasy.

### wanna read more?

Read the articles at `/blog`. For publishing instructions, supported formatting, and deployment checks, see [BLOGGING.md](BLOGGING.md).

### licks or no licks?

if you made it this far you already licks it. smash that star ⭐ and bounce or stick around and contribute idc both valid 💯

---

**built by [nayan das](https://github.com/nayandas69)** — `mit` licensed, do whatever you want with it no cap
