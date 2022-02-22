import { z } from 'zod';
import { getSuspendCache, setSuspendCache } from '../../cache/suspend.mjs';
import { get, prepare } from '../index.mjs';

const stmt = await prepare('SELECT suspend FROM channel WHERE id = ?');

const GetSuspendRecord = z.object({
  suspend: z.number(),
});
type GetSuspendRecord = z.infer<typeof GetSuspendRecord>;

export const SuspendResult = z.boolean();
export type SuspendResult = z.infer<typeof SuspendResult>;

export const getSuspend = async (channelId: string) => {
  // try get value from cache
  const cache = getSuspendCache(channelId);
  if (cache) return cache;

  // hasnot cach, try get from db
  const res = await get(stmt, [channelId]);
  if (!res) return false;
  const data = await GetSuspendRecord.parseAsync(res);
  const suspendResult = data.suspend === 1;

  // set cache
  if (!cache) setSuspendCache(channelId, suspendResult);

  return suspendResult;
};
