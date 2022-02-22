import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';
import { deleteIgnore } from '../../db/ignore/deleteIgnore.mjs';

export const removeIgnore = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args } = commandOption;
  if (args.length !== 1) {
    await say(channel, command.description);
    return false;
  }
  const userName = args[0];

  const res = await deleteIgnore(channel, userName);

  if (res) {
    await say(channel, `remove ignore -> ${userName}`);
  }

  return res;
};
