import { run } from '../client';

export const updateActive = async (channelId: string, active: boolean) => {
  const res = await run(`UPDATE channel SET active = ? WHERE id = ?`, [active ? 1 : 0, channelId]);
  if (!res) return false;
  return true;
};
