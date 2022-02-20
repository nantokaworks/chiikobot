import tmi from 'tmi.js';
import { Command, commandOption } from '.';
import { client } from '../index';
import { getFilters } from '../../db/sql/getFilters';
import { insertFilter } from '../../db/sql/insertFilter';

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
    await client.say(channel, `add filter -> ${pattern}`);
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
  await client.say(channel, `filters -> ${line}`);

  return true;
};
