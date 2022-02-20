import { z } from 'zod';
import { all } from '../client';

export const Channel = z.object({
  id: z.string(),
});
export type Channel = z.infer<typeof Channel>;

export const Channels = z.array(Channel);
export type Channels = z.infer<typeof Channels>;

export const getJoinChannels = async () => {
  const res = await all(`SELECT id FROM channel WHERE "join" = 1`, []);
  const channels = await Channels.parse(res);
  return channels;
};
