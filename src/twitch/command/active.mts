import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { updateActive } from '../../db/sql/updateActive.mjs';

export const active = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { isOwner } = commandOption;
  if (!isOwner) return false;

  await updateActive(channel, true);

  await client.say(channel, `ボットが走り出した！`);
  return true;
};
