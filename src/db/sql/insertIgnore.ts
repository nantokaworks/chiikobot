import { z } from 'zod';
import { run } from '../client';

export const InsertIgnoreResult = z.boolean();
export type InsertIgnoreResult = z.infer<typeof InsertIgnoreResult>;

export const insertIgnore = async (channelId: string, userName: string) => {
  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const res = await run(`INSERT INTO ignore (channel_id, user_name) VALUES (?, ?)`, [tmpChannelId, userName]);
  return InsertIgnoreResult.parse(res);
};
