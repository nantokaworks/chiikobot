import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { updateActive } from '../../db/sql/updateActive.mjs';

export const inactive = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { isOwner } = commandOption;
  if (!isOwner) return false;

  await updateActive(channel, false);

  await client.say(channel, `ボット休憩中`);
  return true;
};
