import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { client } from '../index.mjs';
import { Chance } from 'chance';

const OMIKUJI = ['大吉', '中吉', '末吉', '小吉', '吉', '凶', '大凶'];

export const omikuji = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const userName = userstate.username;
  const displayName = userstate['display-name'] || userName;
  const omikuji = new Chance().pickone(OMIKUJI);
  client.say(channel, `${displayName} さんのおみくじ -> ${omikuji}`);
  return true;
};
