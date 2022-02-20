import tmi from 'tmi.js';
import { Command, commandOption } from '.';
import { insertChannel } from '../../db/sql/insertChannel';
import { client } from '../index';

export const registChannel = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args, isRoot } = commandOption;
  if (!isRoot) return false;
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
