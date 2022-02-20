import { z } from 'zod';
import { run } from '../client.mjs';
import { v4 } from 'uuid';

export const InsertFilterResult = z.boolean();
export type InsertFilterResult = z.infer<typeof InsertFilterResult>;

export const insertFilter = async (channelId: string, pattern: string) => {
  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const uuid = v4();
  const res = await run(`INSERT INTO filter (id, channel_id, pattern) VALUES (?, ?, ?)`, [uuid, tmpChannelId, pattern]);
  return InsertFilterResult.parse(res);
};
