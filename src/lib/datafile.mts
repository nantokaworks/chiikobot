import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const dataDir = '.data';

if (!existsSync(dataDir)) {
  await mkdir('.data', { recursive: true });
  console.log(`make directory -> ${dataDir}`);
}
export const dbFile = join('.data', 'sqlite.db');
export const cacheFile = join('.data', 'cache.json');
