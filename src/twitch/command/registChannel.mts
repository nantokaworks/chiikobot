import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { insertChannel } from '../../db/sql/insertChannel.mjs';
import { client } from '../index.mjs';

export const registChannel = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args } = commandOption;
  if (args.length !== 1) {
    await client.say(channel, command.description);
    return false;
  }
  const newChannel = args[0].startsWith('#') ? args[0] : `#${args[0]}`;

  const res = await insertChannel(newChannel);

  if (res) {
    await client.join(newChannel);
    await client.say(channel, `registed channel -> ${newChannel}`);
  }

  return res;
};
