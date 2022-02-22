import { z } from 'zod';
import { TWITCH_ROOT_CHANNEL } from '../../lib/env.mjs';
import { get, prepare } from '../index.mjs';

const stmt = await prepare('SELECT COUNT(*) AS count FROM channel WHERE id = ?');

export const CountResult = z.object({
  count: z.number(),
});
export type CountResult = z.infer<typeof CountResult>;

export const channelExists = async (channelId: string) => {
  const res = await get(stmt, [TWITCH_ROOT_CHANNEL]);
  const countResult = await CountResult.parseAsync(res);
  return countResult.count > 0;
};
