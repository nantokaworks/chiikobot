import { addIgnoreCache } from '../../cache/ignore.mjs';
import { BotInsertIgnoreError } from '../../error/botError.mjs';
import { prepare, run } from '../index.mjs';
import { makeIgnoreCacheIfEmpty } from './getIgnores.mjs';

const stmt = await prepare('INSERT INTO ignore (channel_id, user_name) VALUES (?, ?)');

export const insertIgnore = async (channelId: string, userName: string) => {
  // make cache if empty
  await makeIgnoreCacheIfEmpty(channelId);

  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const success = await run(stmt, [tmpChannelId, userName]);
  if (!success) throw new BotInsertIgnoreError(`insert failure: channelId -> ${channelId}, userName -> ${userName}`);

  // set cache
  addIgnoreCache(channelId, userName);

  return true;
};
