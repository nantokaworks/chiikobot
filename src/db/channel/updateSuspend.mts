import { setSuspendCache } from '../../cache/suspend.mjs';
import { BotUpdateChannelSuspendError } from '../../error/botError.mjs';
import { prepare, run } from '../index.mjs';

const stmt = await prepare('UPDATE channel SET suspend = ? WHERE id = ?');

export const updateSuspend = async (channelId: string, suspend: boolean) => {
  const success = await run(stmt, [suspend ? 1 : 0, channelId]);
  if (!success) throw new BotUpdateChannelSuspendError(`update suspend failure: channelId -> ${channelId}, suspend -> ${suspend}`);

  setSuspendCache(channelId, suspend);
  return true;
};
