import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { updateChannelJoin } from '../../db/sql/updateChannelJoin.mjs';

export const leaveChannel = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args, isRoot } = commandOption;
  if (!isRoot) return false;
  if (args.length !== 1) {
    await client.say(channel, command.description);
    return false;
  }
  const targetChannel = args[0].startsWith('#') ? args[0] : `#${args[0]}`;

  const res = await updateChannelJoin(targetChannel, false);

  if (res) {
    await client.part(targetChannel);
    await client.say(channel, `leave channel from -> ${targetChannel}`);
  }

  return res;
};
