import assert from 'node:assert/strict';
import { readFile, writeFile, rm } from 'node:fs/promises';

const action = process.argv[2];
assert.ok(['prepare', 'cleanup'].includes(action), 'Use prepare or cleanup');
const fixtures = ['smoke-test-draft.md', 'smoke-test-future.md'];
const source = new URL('../__tests__/fixtures/blog-production/', import.meta.url);
const destination = new URL('../content/blog/', import.meta.url);
const marker = '<!-- blog-smoke-fixture: generated for verification -->';
// A full year ahead keeps the scheduled fixture excluded even across midnight.
const futureDate = new Date(Date.now() + 366 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
const created = [];
try {
  for (const file of fixtures) {
    const path = new URL(file, destination);
    if (action === 'prepare') {
      const content = (await readFile(new URL(file, source), 'utf8')).replace(
        'FUTURE_DATE',
        futureDate
      );
      // Never overwrite an article already using a reserved fixture filename.
      await writeFile(path, content, { flag: 'wx' });
      created.push(path);
    } else {
      const content = await readFile(path, 'utf8').catch((error) => {
        if (error.code === 'ENOENT') return undefined;
        throw error;
      });
      if (content === undefined) continue;
      assert.ok(content.includes(marker), `Refusing to remove a non-fixture article: ${file}`);
      await rm(path);
    }
  }
} catch (error) {
  await Promise.all(created.map((path) => rm(path)));
  throw error;
}
console.log(`Blog smoke fixtures: ${action} complete.`);
