import { prepare, run } from '../index.mjs';
import { v4 } from 'uuid';
import { addFilterCache } from '../../cache/filter.mjs';
import { BotInsertFilterError } from '../../error/botError.mjs';
import { makeFilterCacheIfEmpty } from './getFilters.mjs';

const stmt = await prepare('INSERT INTO filter (id, channel_id, pattern) VALUES (?, ?, ?)');

export const insertFilter = async (channelId: string, pattern: string) => {
  // make cache
  await makeFilterCacheIfEmpty(channelId);

  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const uuid = v4();
  const success = await run(stmt, [uuid, tmpChannelId, pattern]);
  if (!success) throw new BotInsertFilterError(`insert failure: channelId -> ${channelId}, pattern -> ${pattern}`);

  // set cache
  addFilterCache(channelId, uuid, pattern);

  return true;
};
