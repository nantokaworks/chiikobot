import { z } from 'zod';
import { run } from '../client';

export const DeleteFilterResult = z.boolean();
export type DeleteFilterResult = z.infer<typeof DeleteFilterResult>;

export const deleteFilter = async (channelId: string, uuid: string) => {
  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const res = await run(`DELETE FROM filter WHERE channel_id = ? AND id = ?`, [tmpChannelId, uuid]);
  return DeleteFilterResult.parse(res);
};
