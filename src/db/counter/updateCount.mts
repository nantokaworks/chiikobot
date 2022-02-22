import { BotUpdateCountAllError, BotUpdateCountByNameError, BotUpsertCountError } from '../../error/botError.mjs';
import { prepare, run } from '../index.mjs';

const stmtUpsert = await prepare(
  'INSERT INTO counter (channel_id, user_id, user_name, count) VALUES (?, ?, ?, ?) ON CONFLICT(channel_id, user_id) DO UPDATE SET user_name = ?, count = ?',
);
const stmtUpdateByName = await prepare('UPDATE counter SET count = ? WHERE channel_id = ? AND user_name = ?');
const stmtUpdateAll = await prepare('UPDATE counter SET count = ? WHERE channel_id = ?');

export const upsertCount = async (channelId: string, userId: string, userName: string, count: number) => {
  const success = await run(stmtUpsert, [channelId, userId, userName, count, userName, count]);
  if (!success)
    throw new BotUpsertCountError(`upsert failure: channelId -> ${channelId}, userId -> ${userId}, userName -> ${userName}, count -> ${count}`);

  return true;
};

export const updateCountByName = async (channelId: string, userName: string, count: number) => {
  const success = await run(stmtUpdateByName, [count, channelId, userName]);
  if (!success) throw new BotUpdateCountByNameError(`update count failure: channelId -> ${channelId}, userName -> ${userName}, count -> ${count}`);

  return true;
};

export const updateCountAll = async (channelId: string, count: number) => {
  const success = await run(stmtUpdateAll, [count, channelId]);
  if (!success) throw new BotUpdateCountAllError(`update count failure: channelId -> ${channelId}, count -> ${count}`);

  return true;
};
