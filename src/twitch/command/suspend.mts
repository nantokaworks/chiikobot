import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { updateSuspend } from '../../db/sql/updateSuspend.mjs';

export const suspend = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  await updateSuspend(channel, true);

  await client.say(channel, `ボットが潜伏しています、!resume以外に反応しません！`);
  return true;
};
