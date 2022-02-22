import { z } from 'zod';
import { getFilterCache, hasFilterCache, setFilterCache } from '../../cache/filter.mjs';
import { all, prepare } from '../index.mjs';

const stmt = await prepare('SELECT id, pattern FROM filter WHERE channel_id = ?');

export const Filter = z.object({
  id: z.string(),
  pattern: z.string(),
});

export const FiltersResult = z.array(Filter);
export type FiltersResult = z.infer<typeof FiltersResult>;

export const makeFilterCacheIfEmpty = async (channelId: string) => {
  // try bundle get when cm is empty(make cache)
  if (!hasFilterCache(channelId)) await getFilters(channelId);
};

export const getFilters = async (channelId: string) => {
  // try datas from cache
  const cache = getFilterCache(channelId);
  if (cache) return cache;

  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const res = await all(stmt, [tmpChannelId]);
  const datas = await FiltersResult.parseAsync(res);

  // set cache
  setFilterCache(channelId, datas);

  return datas;
};
