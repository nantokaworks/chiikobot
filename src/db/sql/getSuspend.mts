import { z } from 'zod';
import { get } from '../client.mjs';

export const SuspendResult = z.object({
  suspend: z.number(),
});
export type SuspendResult = z.infer<typeof SuspendResult>;

export const getSuspend = async (channelId: string) => {
  const res = await get(`SELECT suspend FROM channel WHERE id = ?`, [channelId]);
  if (!res) return false;
  const data = SuspendResult.parse(res);
  return data.suspend === 1;
};
