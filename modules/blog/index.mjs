import { defineNuxtModule, addTemplate, addVitePlugin } from '@nuxt/kit';
import { readdir, readFile } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compilePost, publishedPosts } from './compiler.mjs';

export default defineNuxtModule({
  meta: { name: 'repository-blog' },
  async setup(_options, nuxt) {
    const directory = resolve(nuxt.options.rootDir, 'content/blog');
    nuxt.options.watch.push(directory);
    const files = (await readdir(directory)).filter((file) => /\.mdx?$/i.test(file)).sort();
    const entries = await Promise.all(
      files.map(async (file) => {
        const path = resolve(directory, file);
        return { path, ...(await compilePost(await readFile(path, 'utf8'), path)) };
      })
    );
    const posts = publishedPosts(entries.map((entry) => entry.metadata));
    const published = new Set(posts.map((post) => post.slug));
    const compiled = new Map(
      entries
        .filter((entry) => published.has(entry.metadata.slug))
        .map((entry) => [entry.path, entry.code])
    );
    const manifest = addTemplate({
      filename: 'blog-manifest.ts',
      getContents: () =>
        `import type { BlogPost } from ${JSON.stringify(resolve(nuxt.options.srcDir, 'types/index'))};\nexport const posts: BlogPost[] = ${JSON.stringify(posts.map(({ draft, ...post }) => post))};\nexport const loaders = {${entries
          .filter((entry) => published.has(entry.metadata.slug))
          .map(
            (entry) =>
              `${JSON.stringify(entry.metadata.slug)}: () => import(${JSON.stringify(entry.path)})`
          )
          .join(',\n')}} as Record<string, () => Promise<{ default: import('vue').Component }>>;`,
    });
    nuxt.options.alias['#blog'] = manifest.dst;
    nuxt.options.alias['#blog-runtime/jsx-runtime'] = fileURLToPath(
      new URL('jsx-runtime.mjs', import.meta.url)
    );
    addVitePlugin({
      name: 'repository-blog',
      enforce: 'pre',
      transform(_source, id) {
        const path = id.split('?')[0];
        if (compiled.has(path)) return { code: compiled.get(path), map: null };
      },
    });
    const routes = ['/blog', ...posts.map((post) => post.url)];
    nuxt.options.nitro.prerender ??= {};
    nuxt.options.nitro.prerender.routes = [
      ...new Set([...(nuxt.options.nitro.prerender.routes ?? []), ...routes]),
    ];
    nuxt.options.nitro.prerender.failOnError = true;
    nuxt.hook('builder:watch', async (_event, path) => {
      const changed = relative(
        directory,
        isAbsolute(path) ? path : resolve(nuxt.options.srcDir, path)
      );
      if (!changed.startsWith('..') && /\.mdx?$/i.test(changed))
        await nuxt.callHook('restart', { hard: true });
    });
  },
});
