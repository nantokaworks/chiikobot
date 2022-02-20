import { z } from 'zod';
import { get } from '../client';

export const ActiveResult = z.object({
  active: z.number(),
});
export type ActiveResult = z.infer<typeof ActiveResult>;

export const getActive = async (channelId: string) => {
  const res = await get(`SELECT active FROM channel WHERE id = ?`, [channelId]);
  if (!res) return false;
  const data = ActiveResult.parse(res);
  return data.active === 1;
};
