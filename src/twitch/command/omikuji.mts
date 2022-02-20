import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';

const OMIKUJI = ['大吉', '中吉', '末吉', '小吉', '吉', '凶', '大凶'];

export const omikuji = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const len = OMIKUJI.length;
  const userName = userstate.username;
  const displayName = userstate['display-name'] || userName;
  const index = Math.floor(Math.random() * len);
  client.say(channel, `${displayName} さんのおみくじ -> ${OMIKUJI[index]}`);
  return true;
};
