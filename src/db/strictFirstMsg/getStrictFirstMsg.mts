import { z } from 'zod';
import { getStrictFirstMsgCache, setStrictFirstMsgCache } from '../../cache/strictFirstMsg.mjs';
import { get, prepare } from '../index.mjs';

const stmtStrictFirstMsgById = await prepare('SELECT enabled FROM strict_first_msg WHERE channel_id = ?');

export const StrictFirstMsgResult = z.object({
  enabled: z.number(),
});
export type StrictFirstMsgResult = z.infer<typeof StrictFirstMsgResult>;

export const getStrictFirstMsgById = async (channelId: string) => {
  // try get from cache
  const cache = getStrictFirstMsgCache(channelId);
  if (cache) return cache.enabled === 1;

  // try get from db
  const res = await get(stmtStrictFirstMsgById, [channelId]);
  try {
    if (!res) throw new Error('not found record');
    const countResult = await StrictFirstMsgResult.parseAsync(res);
    setStrictFirstMsgCache(channelId, countResult);
    return countResult.enabled === 1;
  } catch (e) {
    setStrictFirstMsgCache(channelId, { enabled: 1 });
    return true;
  }
};
