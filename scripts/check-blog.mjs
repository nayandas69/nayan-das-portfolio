import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { parsePost, publishedPosts } from '../modules/blog/compiler.mjs';

// Prepare smoke fixtures before building, then run against the started production server.
const base = process.argv[2] || 'http://127.0.0.1:3000';
const origin = (
  process.env.NUXT_PUBLIC_SITE_URL || 'https://nayan-das-portfolio-nine.vercel.app'
).replace(/\/$/, '');
const directory = new URL('../content/blog/', import.meta.url);
const entries = await Promise.all(
  (await readdir(directory))
    .filter((file) => /\.mdx?$/i.test(file))
    .map(async (file) => parsePost(await readFile(new URL(file, directory), 'utf8'), file).metadata)
);
const posts = publishedPosts(entries);
const draftFixture = entries.find((entry) => entry.slug === 'smoke-test-draft');
const futureFixture = entries.find((entry) => entry.slug === 'smoke-test-future');
assert.ok(draftFixture && futureFixture, 'Prepare smoke fixtures before the production build');
assert.equal(draftFixture.draft, true, 'draft fixture must remain a draft');
assert.equal(futureFixture.draft, false, 'scheduled fixture must exercise date exclusion alone');
assert.ok(
  futureFixture.date > new Date().toISOString().slice(0, 10),
  'scheduled fixture must be future-dated'
);
const excludedEntries = entries.filter((entry) => !posts.some((post) => post.slug === entry.slug));
assert.ok(excludedEntries.length >= 2, 'exclusion checks require both synthetic fixtures');
for (const fixture of [draftFixture, futureFixture]) {
  assert.ok(
    excludedEntries.includes(fixture),
    `${fixture.slug}: must be excluded from published posts`
  );
}
const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
async function request(path, status = 200) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, status, `${path}: expected HTTP ${status}`);
  return response.text();
}

const archive = await request('/blog');
assert.equal(
  (archive.match(/class="post-link"/g) || []).length,
  posts.length,
  'archive lists every published article'
);
const sitemap = await request('/sitemap.xml');
for (const post of posts) {
  const html = await request(post.url);
  assert.ok(
    html.includes(`<h1>${escapeHtml(post.title)}</h1>`),
    `${post.url}: title exists before JavaScript`
  );
  assert.ok(
    html.includes(`rel="canonical" href="${origin}${post.url}"`),
    `${post.url}: canonical URL`
  );
  const structured = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(structured, `${post.url}: structured data exists`);
  assert.equal(JSON.parse(structured[1]).headline, post.title);
  assert.ok(html.includes('<pre'), `${post.url}: code example exists in the server response`);
  assert.ok(
    sitemap.includes(`<loc>${origin}${post.url}</loc>`),
    `${post.url}: sitemap includes published article`
  );
}
for (const excluded of excludedEntries) {
  assert.ok(!archive.includes(excluded.url), 'excluded article is absent from archive');
  assert.ok(
    !sitemap.includes(`<loc>${origin}${excluded.url}</loc>`),
    'excluded article is absent from sitemap'
  );
  await request(excluded.url, 404);
}
const guide = await request('/blog/markdown-that-reads-well');
for (const type of ['note', 'tip', 'important', 'warning', 'caution'])
  assert.ok(guide.includes(`callout--${type}`), `${type} callout rendered`);
assert.ok(guide.includes('5 callout categories'), 'MDX expression evaluated');
assert.match(
  guide,
  /<span class="code-block__title"[^>]*>example\.ts<\/span>/,
  'article page maps fenced code to the titled CodeBlock component'
);
assert.ok(guide.includes('class="callout callout--tip"'), 'callout uses actual HTML classes');
await request('/blog/this-article-does-not-exist', 404);
const home = await request('/');
const section = home.match(/<section[^>]*aria-labelledby="articles-title"[\s\S]*?<\/section>/)?.[0];
assert.ok(section, 'home article section exists');
assert.equal(
  (section.match(/class="post-link"/g) || []).length,
  Math.min(5, posts.length),
  'home displays exactly five newest published articles'
);
for (const post of posts.slice(0, 5))
  assert.ok(section.includes(`href="${post.url}"`), 'home links to the correct newest article');
console.log(
  `Blog smoke passed: ${posts.length} article routes, archive, five home previews, sitemap, canonical URLs, structured data, titled code header, callouts, MDX expression, ${excludedEntries.length} excluded articles, and missing-slug 404.`
);
