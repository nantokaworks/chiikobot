import { Low, JSONFile } from 'lowdb';
import { cacheFile } from '../lib/datafile.mjs';

// Use JSON file for storage
const adapter = new JSONFile(cacheFile);
export const cache = new Low(adapter);

export type Cache = {
  channels: { name: string }[];
};

// default cache
const defaultCache: Cache = {
  channels: [],
};

(async () => {
  await cache.read();
  cache.data ||= defaultCache;
})();
