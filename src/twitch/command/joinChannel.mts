import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say, join } from '../index.mjs';
import { updateChannelJoin } from '../../db/channel/updateChannelJoin.mjs';

export const joinChannel = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args } = commandOption;
  if (args.length !== 1) {
    await say(channel, command.description);
    return false;
  }
  const targetChannel = args[0].startsWith('#') ? args[0] : `#${args[0]}`;

  const res = await updateChannelJoin(targetChannel, true);

  if (res) {
    await join(targetChannel);
    await say(channel, `join channel to -> ${targetChannel}`);
  }

  return res;
};
