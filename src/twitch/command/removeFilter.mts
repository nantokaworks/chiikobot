import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { deleteFilter } from '../../db/sql/deleteFilter.mjs';

export const removeFilter = async (
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
  const id = args[0];

  const res = await deleteFilter(channel, id);

  if (res) {
    await client.say(channel, `remove filter -> ${id}`);
  }

  return res;
};
