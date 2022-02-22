import { removeIgnoreCache } from '../../cache/ignore.mjs';
import { BotDeleteIgnoreError } from '../../error/botError.mjs';
import { prepare, run } from '../index.mjs';
import { makeIgnoreCacheIfEmpty } from './getIgnores.mjs';

const stmt = await prepare('DELETE FROM ignore WHERE channel_id = ? AND user_name = ?');

export const deleteIgnore = async (channelId: string, userName: string) => {
  // make cache if empty
  await makeIgnoreCacheIfEmpty(channelId);

  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const success = await run(stmt, [tmpChannelId, userName]);
  if (!success) throw new BotDeleteIgnoreError(`delete failure: channelId -> ${channelId}, userName -> ${userName}`);

  // remove from cache
  removeIgnoreCache(channelId, userName);

  return true;
};
