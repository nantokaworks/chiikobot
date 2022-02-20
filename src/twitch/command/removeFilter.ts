import tmi from 'tmi.js';
import { Command, commandOption } from '.';
import { client } from '../index';
import { deleteFilter } from '../../db/sql/deleteFilter';

export const removeFilter = async (
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
  const id = args[0];

  const res = await deleteFilter(channel, id);

  if (res) {
    await client.say(channel, `remove filter -> ${id}`);
  }

  return res;
};
