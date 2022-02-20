import tmi from 'tmi.js';
import { Command, commandOption } from '.';
import { client } from '../index';
import { updateActive } from '../../db/sql/updateActive';

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
