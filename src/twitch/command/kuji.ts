import tmi from 'tmi.js';
import { Command, commandOption } from '.';
import { client } from '../index';

const KUJI = ['大吉', '中吉', '末吉', '小吉', '吉', '凶', '大凶'];

export const kuji = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const len = KUJI.length;
  const userName = userstate.username;
  const displayName = userstate['display-name'] || userName;
  const index = Math.floor(Math.random() * len);
  client.say(channel, `${displayName} さんのおみくじ -> ${KUJI[index]}`);
  return true;
};
