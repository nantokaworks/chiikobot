import { z } from 'zod';
import { TWITCH_ROOT_CHANNEL } from '../../lib/env';
import { get } from '../client';

export const CountResult = z.object({
  count: z.number(),
});
export type CountResult = z.infer<typeof CountResult>;

export const channelExists = async (channelId: string) => {
  const res = await get(`SELECT COUNT(*) AS count FROM channel WHERE id = ?`, [TWITCH_ROOT_CHANNEL]);
  const countResult = await CountResult.parse(res);
  return countResult.count > 0;
};
