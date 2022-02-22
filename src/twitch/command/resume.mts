import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';
import { updateSuspend } from '../../db/channel/updateSuspend.mjs';

export const resume = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  await updateSuspend(channel, false);

  await say(channel, `ボットが帰ってきました！`);
  return true;
};
