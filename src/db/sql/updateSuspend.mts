import { run } from '../client.mjs';

export const updateSuspend = async (channelId: string, suspend: boolean) => {
  const res = await run(`UPDATE channel SET suspend = ? WHERE id = ?`, [suspend ? 1 : 0, channelId]);
  if (!res) return false;
  return true;
};
