import { get, run } from '../client';

export const upsertCount = async (channelId: string, userId: string, userName: string, count: number) => {
  const res = await get(
    `INSERT INTO counter (channel_id, user_id, user_name, count) VALUES (?, ?, ?, ?) ON CONFLICT(channel_id, user_id) DO UPDATE SET user_name = ?, count = ?`,
    [channelId, userId, userName, count, userName, count],
  );
  if (!res) return false;
  return true;
};

export const updateCountByName = async (channelId: string, userName: string, count: number) => {
  const res = await run(`UPDATE counter SET count = ? WHERE channel_id = ? AND user_name = ?`, [count, channelId, userName]);
  if (!res) return false;
  return true;
};

export const updateCountAll = async (channelId: string, count: number) => {
  const res = await run(`UPDATE counter SET count = ? WHERE channel_id = ?`, [count, channelId]);
  if (!res) return false;
  return true;
};
