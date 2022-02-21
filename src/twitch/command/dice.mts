import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { Chance } from 'chance';

export const dice = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const userName = userstate.username;
  const displayName = userstate['display-name'] || userName;
  const dice = new Chance().d6();
  client.say(channel, `${displayName} さんのサイコロの目 -> ${dice}`);
  return true;
};
