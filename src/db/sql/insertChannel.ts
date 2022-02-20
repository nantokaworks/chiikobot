import { z } from 'zod';
import { run } from '../client';

export const InsertChannelResult = z.boolean();
export type InsertChannelResult = z.infer<typeof InsertChannelResult>;

export const insertChannel = async (channelId: string) => {
  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const res = await run(`INSERT INTO channel (id, active) VALUES (?, 1)`, [tmpChannelId]);
  console.log(`insert channel -> ${tmpChannelId}`);
  return InsertChannelResult.parse(res);
};
