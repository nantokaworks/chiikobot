import tmi from 'tmi.js';
import { Command, commandOption } from '.';
import { getCounterMessages } from '../../db/sql/getCounterMessage';
import { client } from '../index';

export const counterMessage = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const res = await getCounterMessages(channel);
  if (res.length === 0) {
    await client.say(channel, `記念メッセージはないみたいです`);
  } else {
    const line = res.map((data) => `${data.threshold}コメ目: ${data.name}`).join(' / ');
    await client.say(channel, `記念メッセージ -> ${line}`);
  }

  // return res;
  return true;
};
