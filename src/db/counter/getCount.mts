import { z } from 'zod';
import { get, prepare } from '../index.mjs';

const stmtCountById = await prepare('SELECT count FROM counter WHERE channel_id = ? AND user_id = ?');
const stmtCountByName = await prepare('SELECT count FROM counter WHERE channel_id = ? AND user_name = ?');

export const CounterResult = z.object({
  count: z.number(),
});
export type CounterResult = z.infer<typeof CounterResult>;

export const getCountById = async (channelId: string, userId: string) => {
  const res = await get(stmtCountById, [channelId, userId]);
  if (!res) return 0;
  const countResult = await CounterResult.parseAsync(res);
  return countResult.count || 0;
};

export const getCountByName = async (channelId: string, userName: string) => {
  const res = await get(stmtCountByName, [channelId, userName]);
  if (!res) return 0;
  const countResult = await CounterResult.parseAsync(res);
  return countResult.count || 0;
};
