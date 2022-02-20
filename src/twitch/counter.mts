import tmi from 'tmi.js';
import { client } from './index.mjs';
import { getCountById } from '../db/sql/getCount.mjs';
import { getCounterMessage } from '../db/sql/getCounterMessage.mjs';
import { upsertCount } from '../db/sql/updateCount.mjs';

export const counter = async (channel: string, userstate: tmi.ChatUserstate, message: string) => {
  const userId = userstate['user-id'] || '';
  const userName = userstate['username'] || '';
  const displayName = userstate['display-name'] || userName;
  const currentCount = await getCountById(channel, userId);
  await upsertCount(channel, userId, userName, currentCount + 1);

  const counterMessage = await getCounterMessage(channel, currentCount + 1);
  if (!counterMessage || counterMessage === '') return;
  const formatted = counterMessage.replaceAll('{{userName}}', userName).replaceAll('{{displayName}}', displayName);
  await client.say(channel, formatted);
  return;
};
