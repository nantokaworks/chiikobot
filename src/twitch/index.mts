import tmi from 'tmi.js';
import { TWITCH_BOT_NAME, TWITCH_ROOT_CHANNEL } from '../lib/env.mjs';
import { isAllowMessage } from './check.mjs';
import { onCommand } from './command/index.mjs';
import { counter } from './counter.mjs';
import { getSuspend } from '../db/channel/getSuspend.mjs';
import { putError } from '../error/errorHandler.mjs';

let client: tmi.Client;

let joinedChannel: string[] = [];

export const createClient = (options: tmi.Options) => {
  if (client) client.disconnect();
  client = new tmi.client(options);
  return client;
};

export const say = async (channelId: string, message: string) => {
  return await client.say(channelId, message);
};

export const join = async (channelId: string) => {
  return await client.join(channelId);
};

export const part = async (channelId: string) => {
  return await client.part(channelId);
};

// connect to twitch handler
export const onConnected = async (address: string, port: number) => {
  console.log(`🤖connected to ${address}:${port} with ${TWITCH_BOT_NAME}`);
};

// join
export const onJoined = (channel: string, username: string, self: boolean) => {
  if (joinedChannel.indexOf(channel) !== -1) return;
  joinedChannel.push(channel);
  console.log(`🤝joined -> ${channel} -> ${Date.now()}`);
};

// leace
export const onParted = (channel: string, username: string, self: boolean) => {
  if (joinedChannel.indexOf(channel) === -1) return;
  joinedChannel = joinedChannel.filter((value) => value !== channel);
  console.log(`❌parted -> ${channel} -> ${Date.now()}`);
};

// receive message handler
export const onMessage = async (channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean) => {
  const userName = userstate.username || '';
  const isRoot = channel === TWITCH_ROOT_CHANNEL;
  const isOwner = channel === (userName.startsWith('#') ? userName : `#${userName}`);
  const isCommand = message.startsWith('!');
  const isSuspend = (await getSuspend(channel).catch(putError)) === true;

  // check ignore message
  if (!(await isAllowMessage(channel, userstate, message, self, isCommand, isRoot, isOwner).catch(putError))) {
    return;
  }

  // try run command
  if (isCommand) return await onCommand(channel, userstate, message, self, isRoot, isOwner, isSuspend).catch(putError);

  // exit function if suspended
  if (isSuspend) return;

  // count up!
  await counter(channel, userstate, message).catch(putError);
};
