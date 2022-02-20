import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { updateCountAll, updateCountByName } from '../../db/sql/updateCount.mjs';
import { toNumber } from 'lodash-es';

export const countReset = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args } = commandOption;
  if (args.length < 1) {
    await client.say(channel, command.description);
    return false;
  }

  const count = args.length >= 2 ? toNumber(args[1]) : 0;

  await updateCountByName(channel, args[0], count);

  await client.say(channel, `reset count -> ${args[0]} = ${count}`);

  return true;
};

export const countResetAll = async (
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
