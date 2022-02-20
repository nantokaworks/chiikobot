import { z } from 'zod';
import { all } from '../client.mjs';

export const Ignore = z.object({
  user_name: z.string(),
});

export const GetIgnoresResult = z.array(Ignore);
export type GetIgnoresResult = z.infer<typeof GetIgnoresResult>;

export const getIgnores = async (channelId: string) => {
  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const res = await all(`SELECT user_name FROM ignore WHERE channel_id = ?`, [tmpChannelId]);
  return GetIgnoresResult.parse(res).map((value) => value.user_name);
};
