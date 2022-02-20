import { z } from 'zod';
import { get } from '../client';

export const InsertChannelResult = z.boolean();
export type InsertChannelResult = z.infer<typeof InsertChannelResult>;

export const deleteCounterMessage = async (channelId: string, threshold: number) => {
  const res = await get(`DELETE FROM counter_message WHERE channel_id = ? AND threshold = ?`, [channelId, threshold]);
  if (!res) return false;
  return true;
};
