import { z } from 'zod';
import { run } from '../client';

export const DeleteIgnoreResult = z.boolean();
export type DeleteIgnoreResult = z.infer<typeof DeleteIgnoreResult>;

export const deleteIgnore = async (channelId: string, userName: string) => {
  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const res = await run(`DELETE FROM ignore WHERE channel_id = ? AND user_name = ?`, [tmpChannelId, userName]);
  return DeleteIgnoreResult.parse(res);
};
