import { BotUpdateChannelJoinError } from '../../error/botError.mjs';
import { prepare, run } from '../index.mjs';

const stmt = await prepare('UPDATE channel SET "join" = ? WHERE id = ?');

export const updateChannelJoin = async (channelId: string, join: boolean) => {
  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const success = await run(stmt, [join ? 1 : 0, tmpChannelId]);
  if (!success) throw new BotUpdateChannelJoinError(`update join failure: channelId -> ${channelId}, join -> ${join}`);

  return true;
};
