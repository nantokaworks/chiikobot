import { z } from 'zod';
import { get } from '../client';

export const InsertChannelResult = z.boolean();
export type InsertChannelResult = z.infer<typeof InsertChannelResult>;

export const upsertCounterMessage = async (channelId: string, threshold: number, name: string, message: string) => {
  const res = await get(
    `INSERT INTO counter_message (channel_id, threshold, name, message) VALUES (?, ?, ?, ?) ON CONFLICT(channel_id, threshold) DO UPDATE SET name = ?, message = ?`,
    [channelId, threshold, name, message, name, message],
  );
  if (!res) return false;
  return true;
};
