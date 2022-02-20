import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { deleteIgnore } from '../../db/sql/deleteIgnore.mjs';

export const removeIgnore = async (
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
  const userName = args[0];

  const res = await deleteIgnore(channel, userName);

  if (res) {
    await client.say(channel, `remove ignore -> ${userName}`);
  }

  return res;
};
