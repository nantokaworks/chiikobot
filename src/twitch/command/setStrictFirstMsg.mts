import { toNumber } from 'lodash-es';
import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';
import { upsertStrictFirstMsg } from '../../db/strictFirstMsg/updateStrictFirstMsg.mjs';
import { strictFirstMsg } from './strictFirstMsg.mjs';

export const setStrictFirstMsg = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args } = commandOption;
  if (args.length < 1) {
    return await strictFirstMsg(command, commandOption, channel, userstate, message);
  }
  const enabled = toNumber(args[0]);
  await upsertStrictFirstMsg(channel, enabled === 1);
  await say(channel, `set strict first msg -> enabled: ${enabled === 1}`);

  return true;
};
