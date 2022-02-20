import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { updateSuspend } from '../../db/sql/updateSuspend.mjs';

export const resume = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  await updateSuspend(channel, false);

  await client.say(channel, `ボットが帰ってきました！`);
  return true;
};
