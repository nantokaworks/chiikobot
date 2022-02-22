import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';
import { deleteFilter } from '../../db/filter/deleteFilter.mjs';

export const removeFilter = async (
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
  const id = args[0];

  const res = await deleteFilter(channel, id);

  if (res) {
    await say(channel, `remove filter -> ${id}`);
  }

  return res;
};
