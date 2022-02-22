import { z } from 'zod';
import { all, prepare } from '../index.mjs';

const stmt = await prepare('SELECT id FROM channel WHERE "join" = 1');

export const Channel = z.object({
  id: z.string(),
});
export type Channel = z.infer<typeof Channel>;

export const Channels = z.array(Channel);
export type Channels = z.infer<typeof Channels>;

export const getJoinChannels = async () => {
  const res = await all(stmt, []);
  const channels = await Channels.parseAsync(res);
  return channels;
};
