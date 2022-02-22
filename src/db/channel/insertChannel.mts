import { BotInsertChannelError } from '../../error/botError.mjs';
import { prepare, run } from '../index.mjs';

const stmt = await prepare('INSERT INTO channel (id, suspend) VALUES (?, 0)');

export const insertChannel = async (channelId: string) => {
  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const success = await run(stmt, [tmpChannelId]);
  if (!success) throw new BotInsertChannelError(`insert failure: channelId -> ${channelId}`);

  console.log(`channel inserted -> ${tmpChannelId}`);
  return true;
};
