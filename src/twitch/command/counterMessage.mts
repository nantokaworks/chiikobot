import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { getCounterMessages } from '../../db/counterMessage/getCounterMessage.mjs';
import { say } from '../index.mjs';

export const counterMessage = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const res = await getCounterMessages(channel);
  if (res.length === 0) {
    await say(channel, `記念メッセージはないみたいです`);
  } else {
    const line = res.map((data) => `${data.threshold}コメ目: ${data.name}`).join(' / ');
    await say(channel, `記念メッセージ -> ${line}`);
  }

  // return res;
  return true;
};
