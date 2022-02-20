import tmi from 'tmi.js';
import { client } from '.';
import { getCountById } from '../db/sql/getCount';
import { getCounterMessage } from '../db/sql/getCounterMessage';
import { upsertCount } from '../db/sql/updateCount';

export const counter = async (channel: string, userstate: tmi.ChatUserstate, message: string) => {
  const userId = userstate['user-id'] || '';
  const userName = userstate['username'] || '';
  const displayName = userstate['display-name'] || userName;
  const currentCount = await getCountById(channel, userId);
  await upsertCount(channel, userId, userName, currentCount + 1);

  const counterMessage = await getCounterMessage(channel, currentCount + 1);
  if (!counterMessage || counterMessage === '') return;
  const formatted = counterMessage.replace('<user>', displayName);
  await client.say(channel, formatted);
  return;
};
