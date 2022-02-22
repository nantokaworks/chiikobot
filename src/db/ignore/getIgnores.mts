import { z } from 'zod';
import { getIgnoreCache, hasIgnoreCache, setIgnoreCache } from '../../cache/ignore.mjs';
import { all, prepare } from '../index.mjs';

const stmt = await prepare('SELECT user_name FROM ignore WHERE channel_id = ?');

const IgnoreRecord = z.object({
  user_name: z.string(),
});
type IgnoreRecord = z.infer<typeof IgnoreRecord>;
const IgnoreRecords = z.array(IgnoreRecord);
type IgnoreRecords = z.infer<typeof IgnoreRecords>;

export const IgnoreResult = z.array(z.string());
export type IgnoreResult = z.infer<typeof IgnoreResult>;

export const makeIgnoreCacheIfEmpty = async (channelId: string) => {
  // try bundle get when cm is empty(make cache)
  if (!hasIgnoreCache(channelId)) await getIgnores(channelId);
};

export const getIgnores = async (channelId: string) => {
  // try get value from cache
  const cache = getIgnoreCache(channelId);
  if (cache) return cache;

  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const res = await all(stmt, [tmpChannelId]);
  const ignoreResult = (await IgnoreRecords.parseAsync(res)).map((value) => value.user_name);

  // set cache
  setIgnoreCache(channelId, ignoreResult);

  return ignoreResult;
};
