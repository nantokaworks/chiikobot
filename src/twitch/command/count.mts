import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { getCountById, getCountByName } from '../../db/counter/getCount.mjs';
import { say } from '../index.mjs';

export const count = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args, isOwner } = commandOption;

  // self count view when no args or not owner
  if (args.length === 0 || !isOwner) {
    return await countSelf(command, channel, userstate, message);
  }

  // count view by user name
  const userName = args[0] || '';
  const currentCount = await getCountByName(channel, userName);

  await say(channel, `${userName} さんのコメント数 -> ${currentCount}`);
  return true;
};

export const countSelf = async (command: Command, channel: string, userstate: tmi.ChatUserstate, message: string): Promise<boolean> => {
  const userId = userstate['user-id'] || '';
  const currentCount = await getCountById(channel, userId);
  const userName = userstate.username;
  const displayName = userstate['display-name'] || userName;

  await say(channel, `${displayName} さんのコメント数 -> ${currentCount}`);
  return true;
};
