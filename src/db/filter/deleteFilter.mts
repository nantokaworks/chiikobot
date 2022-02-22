import { removeFilterCache } from '../../cache/filter.mjs';
import { BotDeleteFilterError } from '../../error/botError.mjs';
import { prepare, run } from '../index.mjs';
import { makeFilterCacheIfEmpty } from './getFilters.mjs';

const stmt = await prepare('DELETE FROM filter WHERE channel_id = ? AND id = ?');

export const deleteFilter = async (channelId: string, uuid: string) => {
  // make cache
  await makeFilterCacheIfEmpty(channelId);

  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const success = await run(stmt, [tmpChannelId, uuid]);
  if (!success) throw new BotDeleteFilterError(`delete failure: channelId -> ${channelId}, uuid -> ${uuid}`);

  // remove from cache
  removeFilterCache(channelId, uuid);

  return true;
};
