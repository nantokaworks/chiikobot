import { z } from 'zod';
import { get } from '../client';

export const CounterResult = z.object({
  count: z.number(),
});
export type CounterResult = z.infer<typeof CounterResult>;

export const getCountById = async (channelId: string, userId: string) => {
  const res = await get(`SELECT count FROM counter WHERE channel_id = ? AND user_id = ?`, [channelId, userId]);
  if (!res) return 0;
  const countResult = await CounterResult.parse(res);
  return countResult.count || 0;
};

export const getCountByName = async (channelId: string, userName: string) => {
  const res = await get(`SELECT count FROM counter WHERE channel_id = ? AND user_name = ?`, [channelId, userName]);
  if (!res) return 0;
  const countResult = await CounterResult.parse(res);
  return countResult.count || 0;
};
