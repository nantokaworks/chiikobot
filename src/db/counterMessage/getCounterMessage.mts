import { z } from 'zod';
import { findCounterMessageCache, getCounterMessagesCache, hasCounterMessageCache, setCounterMessagesCache } from '../../cache/counterMessage.mjs';
import { all, prepare } from '../index.mjs';

const stmtMessages = await prepare('SELECT threshold, name, message FROM counter_message WHERE channel_id = ? ORDER BY threshold');

export const CounterMessageResult = z.object({
  threshold: z.number(),
  name: z.string(),
  message: z.string(),
});
export type CounterMessageResult = z.infer<typeof CounterMessageResult>;
export const CounterMessagesResult = z.array(CounterMessageResult);
export type CounterMessagesResult = z.infer<typeof CounterMessagesResult>;

export const makeCounterMessageCacheIfEmpty = async (channelId: string) => {
  // try bundle get when cm is empty(make cache)
  if (!hasCounterMessageCache(channelId)) await getCounterMessages(channelId);
};

export const getCounterMessage = async (channelId: string, threshold: number) => {
  // make cache
  await makeCounterMessageCacheIfEmpty(channelId);

  // try get from cmCache
  const cache = findCounterMessageCache(channelId, threshold);
  if (cache) return cache.message;
  return undefined;
};

export const getCounterMessages = async (channelId: string) => {
  // try get from cache
  const cache = getCounterMessagesCache(channelId);
  if (cache) return cache;

  // try get from db
  const res = await all(stmtMessages, [channelId]);
  if (!res) return [];
  const countResult = await CounterMessagesResult.parseAsync(res);

  // set to cache
  setCounterMessagesCache(channelId, countResult);

  return countResult || [];
};
