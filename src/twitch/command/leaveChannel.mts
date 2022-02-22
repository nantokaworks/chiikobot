import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say, part } from '../index.mjs';
import { updateChannelJoin } from '../../db/channel/updateChannelJoin.mjs';

export const leaveChannel = async (
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

  const res = await updateChannelJoin(targetChannel, false);

  if (res) {
    await part(targetChannel);
    await say(channel, `leave channel from -> ${targetChannel}`);
  }

  return res;
};
