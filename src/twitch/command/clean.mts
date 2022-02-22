import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';
import { cleanDust } from '../../db/cleanDust.mjs';

export const clean = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const res = await cleanDust();

  if (res) {
    await say(channel, `clean!`);
  }

  return res;
};
