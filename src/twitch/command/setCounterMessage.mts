import { toNumber } from 'lodash-es';
import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { upsertCounterMessage } from '../../db/sql/upsertCounterMessage.mjs';
import { client } from '../index.mjs';
import { counterMessage } from './counterMessage.mjs';

export const setCounterMessage = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args } = commandOption;
  if (args.length < 3) {
    return await counterMessage(command, commandOption, channel, userstate, message);
  }
  const threshold = toNumber(args[0]);
  const name = args[1];
  const msg = args.splice(2).join(' ');
  await upsertCounterMessage(channel, threshold, name, msg);
  await client.say(channel, `set counter message -> threshold: ${threshold}, name: ${name}, msg: ${msg}`);

  return true;
};