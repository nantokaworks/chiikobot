import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';
import { getFilters } from '../../db/filter/getFilters.mjs';
import { insertFilter } from '../../db/filter/insertFilter.mjs';

export const addFilter = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args } = commandOption;
  if (args.length !== 1) {
    return await listFilter(command, commandOption, channel, userstate, message);
  }

  const pattern = args[0];
  const res = await insertFilter(channel, pattern);

  if (res) {
    await say(channel, `add filter -> ${pattern}`);
  }

  return res;
};

export const listFilter = async (command: Command, commandOption: commandOption, channel: string, userstate: tmi.ChatUserstate, message: string) => {
  const res = await getFilters(channel);

  let line = '';
  if (res.length > 0) {
    line = res.map((value) => `id: ${value.id} | pattern: ${value.pattern}`).join(' / ');
  } else {
    line = 'none';
  }
  await say(channel, `filters -> ${line}`);

  return true;
};
