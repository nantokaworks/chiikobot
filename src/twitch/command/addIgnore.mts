import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { insertIgnore } from '../../db/sql/insertIgnore.mjs';
import { getIgnores } from '../../db/sql/getIgnores.mjs';

export const addIgnore = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args } = commandOption;
  if (args.length !== 1) {
    return await listIgnores(command, commandOption, channel, userstate, message);
  }
  const userName = args[0];

  const res = await insertIgnore(channel, userName);

  if (res) {
    await client.say(channel, `add ignore -> ${userName}`);
  }

  return res;
};

export const listIgnores = async (command: Command, commandOption: commandOption, channel: string, userstate: tmi.ChatUserstate, message: string) => {
  const res = await getIgnores(channel);

  let line = '';
  if (res.length > 0) {
    line = res.join(' / ');
  } else {
    line = 'none';
  }
  await client.say(channel, `ignores -> ${line}`);

  return true;
};
