import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';
import { updateSuspend } from '../../db/channel/updateSuspend.mjs';

export const suspend = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  await updateSuspend(channel, true);

  await say(channel, `ボットが潜伏しています、!resume以外に反応しません！`);
  return true;
};
