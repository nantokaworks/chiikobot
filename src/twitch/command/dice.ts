import tmi from 'tmi.js';
import { Command, commandOption } from '.';
import { client } from '../index';

export const dice = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const sides = 6;
  const userName = userstate.username;
  const displayName = userstate['display-name'] || userName;
  const dice = Math.floor(Math.random() * sides) + 1;
  client.say(channel, `${displayName} さんのサイコロの目 -> ${dice}`);
  return true;
};
