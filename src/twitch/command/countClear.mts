import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { updateCountAll, updateCountByName } from '../../db/sql/updateCount.mjs';

export const countClear = async (
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

  await updateCountByName(channel, args[0], 0);

  await client.say(channel, `reset count -> ${args[0]}`);

  return true;
};

export const countClearAll = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  await updateCountAll(channel, 0);

  await client.say(channel, `reset count all`);

  return true;
};
