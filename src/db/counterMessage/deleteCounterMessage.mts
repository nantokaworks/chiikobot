import { z } from 'zod';
import { removeCounterMessageCache } from '../../cache/counterMessage.mjs';
import { prepare, run } from '../index.mjs';
import { makeCounterMessageCacheIfEmpty } from './getCounterMessage.mjs';

const stmt = await prepare('DELETE FROM counter_message WHERE channel_id = ? AND threshold = ?');

export const InsertChannelResult = z.boolean();
export type InsertChannelResult = z.infer<typeof InsertChannelResult>;

export const deleteCounterMessage = async (channelId: string, threshold: number) => {
  // make cache
  await makeCounterMessageCacheIfEmpty(channelId);

  const res = await run(stmt, [channelId, threshold]);
  if (!res) return false;

  // remove from cache
  removeCounterMessageCache(channelId, threshold);

  return true;
};
