import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';
import { updateCountAll, updateCountByName } from '../../db/counter/updateCount.mjs';
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
    await say(channel, command.description);
    return false;
  }

  const count = args.length >= 2 ? toNumber(args[1]) : 0;

  await updateCountByName(channel, args[0], count);

  await say(channel, `reset count -> ${args[0]} = ${count}`);

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

  await say(channel, `reset count all`);

  return true;
};
