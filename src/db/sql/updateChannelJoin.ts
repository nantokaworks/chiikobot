import { z } from 'zod';
import { run } from '../client';

export const UpdateChannelJoinResult = z.boolean();
export type UpdateChannelJoinResult = z.infer<typeof UpdateChannelJoinResult>;

export const updateChannelJoin = async (channelId: string, join: boolean) => {
  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const res = await run(`UPDATE channel SET "join" = ? WHERE id = ?`, [join ? 1 : 0, tmpChannelId]);
  return UpdateChannelJoinResult.parse(res);
};
