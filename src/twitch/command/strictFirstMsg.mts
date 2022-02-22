import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';
import { getStrictFirstMsgById } from '../../db/strictFirstMsg/getStrictFirstMsg.mjs';

export const strictFirstMsg = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const enabled = await getStrictFirstMsgById(channel);
  await say(channel, `strict first msg -> enabled: ${enabled}`);

  return true;
};
