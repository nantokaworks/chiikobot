import { z } from 'zod';
import { addCounterMessageCache } from '../../cache/counterMessage.mjs';
import { prepare, run } from '../index.mjs';
import { makeCounterMessageCacheIfEmpty } from './getCounterMessage.mjs';

const stmt = await prepare(
  'INSERT INTO counter_message (channel_id, threshold, name, message) VALUES (?, ?, ?, ?) ON CONFLICT(channel_id, threshold) DO UPDATE SET name = ?, message = ?',
);

export const InsertChannelResult = z.boolean();
export type InsertChannelResult = z.infer<typeof InsertChannelResult>;

export const upsertCounterMessage = async (channelId: string, threshold: number, name: string, message: string) => {
  // make cache
  await makeCounterMessageCacheIfEmpty(channelId);

  const res = await run(stmt, [channelId, threshold, name, message, name, message]);
  if (!res) return false;

  // add to cache
  addCounterMessageCache(channelId, threshold, name, message);

  return true;
};
