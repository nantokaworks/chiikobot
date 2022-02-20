import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { updateChannelJoin } from '../../db/sql/updateChannelJoin.mjs';

export const joinChannel = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args } = commandOption;
  if (args.length !== 1) {
    await client.say(channel, command.description);
    return false;
  }
  const targetChannel = args[0].startsWith('#') ? args[0] : `#${args[0]}`;

  const res = await updateChannelJoin(targetChannel, true);

  if (res) {
    await client.join(targetChannel);
    await client.say(channel, `join channel to -> ${targetChannel}`);
  }

  return res;
};
