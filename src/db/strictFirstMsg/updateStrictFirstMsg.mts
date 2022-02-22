import { setStrictFirstMsgCache } from '../../cache/strictFirstMsg.mjs';
import { BotUpsertStrictFirstMsgError } from '../../error/botError.mjs';
import { prepare, run } from '../index.mjs';

const stmtUpsert = await prepare(
  'INSERT INTO strict_first_msg (channel_id, enabled) VALUES (?, ?) ON CONFLICT(channel_id) DO UPDATE SET enabled = ?',
);

export const upsertStrictFirstMsg = async (channelId: string, enabled: boolean) => {
  const enabledInt = enabled ? 1 : 0;
  const success = await run(stmtUpsert, [channelId, enabledInt, enabledInt]);
  if (!success) throw new BotUpsertStrictFirstMsgError(`upsert failure: channelId -> ${channelId}, enabled -> ${enabled}`);

  setStrictFirstMsgCache(channelId, { enabled: enabledInt });

  return true;
};
