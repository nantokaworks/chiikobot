import { z } from 'zod';
import { all, get } from '../client';

export const CounterMessageResult = z.object({
  message: z.string(),
});
export type CounterMessageResult = z.infer<typeof CounterMessageResult>;

export const getCounterMessage = async (channelId: string, count: number) => {
  const res = await get(`SELECT message FROM counter_message WHERE channel_id = ? AND threshold = ?`, [channelId, count]);
  if (!res) return '';
  const countResult = await CounterMessageResult.parse(res);
  return countResult.message || '';
};

export const CounterMessage = z.object({
  threshold: z.number(),
  name: z.string(),
  message: z.string(),
});

export const CounterMessagesResult = z.array(CounterMessage);
export type CounterMessagesResult = z.infer<typeof CounterMessagesResult>;

export const getCounterMessages = async (channelId: string) => {
  const res = await all(`SELECT threshold, name, message FROM counter_message WHERE channel_id = ? ORDER BY threshold`, [channelId]);
  if (!res) return [];
  const countResult = await CounterMessagesResult.parse(res);
  return countResult || [];
};
