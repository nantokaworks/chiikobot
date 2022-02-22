import tmi from 'tmi.js';
import { say } from './index.mjs';
import { getCountById } from '../db/counter/getCount.mjs';
import { getCounterMessage } from '../db/counterMessage/getCounterMessage.mjs';
import { upsertCount } from '../db/counter/updateCount.mjs';
import { get } from 'lodash-es';
import { getStrictFirstMsgById } from '../db/strictFirstMsg/getStrictFirstMsg.mjs';

export const counter = async (channel: string, userstate: tmi.ChatUserstate, message: string) => {
  const userId = userstate['user-id'] || '';
  const userName = userstate['username'] || '';
  const displayName = userstate['display-name'] || userName;
  const firstMsg: boolean = get(userstate, 'first-msg') === true;
  const strictFirstMsg: boolean = await getStrictFirstMsgById(channel);
  const prevCount = await getCountById(channel, userId);
  const currentCount = prevCount + 1;
  await upsertCount(channel, userId, userName, currentCount);

  const counterMessage = await getCounterMessage(channel, currentCount);
  if (!counterMessage || counterMessage === '') return;
  if (currentCount === 1 && !firstMsg && strictFirstMsg) return;
  const formatted = counterMessage.replaceAll('{{userName}}', userName).replaceAll('{{displayName}}', displayName);
  await say(channel, formatted);
  return;
};
