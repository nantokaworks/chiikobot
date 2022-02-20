import tmi from 'tmi.js';
import { Channels } from '../db/sql/getJoinChannels';
import { TWITCH_BOT_NAME, TWITCH_ROOT_CHANNEL, TWITCH_TOKEN } from '../lib/env';
import { isAllowMessage } from './check';
import { commandOption, commands } from './command';
import { counter } from './counter';
import { getActive } from '../db/sql/getActive';

export let client: tmi.Client;

// receive message handler
const onMessage = async (channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean) => {
  const userName = userstate.username || '';
  const isRoot = channel === TWITCH_ROOT_CHANNEL;
  const isOwner = channel === (userName.startsWith('#') ? userName : `#${userName}`);
  const isCommand = message.startsWith('!');

  // check ignore message
  const allow = await isAllowMessage(channel, userstate, message, self, isCommand, isRoot, isOwner);
  if (!allow) {
    return;
  }

  // check command
  const isActiveChannel = await getActive(channel);

  let isHandled = false;
  if (isCommand) {
    // find command
    const values = message.split(' ');
    const commandStr = values[0].toLowerCase().trim();
    const targets = commands.filter((value) => value.command === commandStr);
    const command = targets.length > 0 ? targets[0] : undefined;

    // run command if exists
    if (command) {
      if (!isActiveChannel && !isOwner) return;
      if (command.isOwnerOnly && !isOwner) return;
      if (command.isRootOnly && !isRoot) return;
      const option: commandOption = {
        args: message.split(' ').splice(1),
        isRoot,
        isOwner,
      };
      if (!command.isRootOnly || (command.isRootOnly && isRoot)) {
        isHandled = await command.handler(command, option, channel, userstate, message);
      }
    }
  }

  // exit function if command handled
  if (isHandled) return;

  await counter(channel, userstate, message);
};

// connect to twitch handler
const onConnected = async (address: string, port: number) => {
  console.log(`🤖connected to ${address}:${port} with ${TWITCH_BOT_NAME}`);
};

export const initialize = async (channelList: Channels) => {
  // listup channels
  const channels = channelList.map((channel) => channel.id);

  // twitch connection options
  const opts = {
    identity: {
      username: TWITCH_BOT_NAME,
      password: TWITCH_TOKEN,
    },
    connection: {
      reconnect: true,
      secure: true,
    },
    channels,
  };

  // create twitch chat bot client
  if (client) client.disconnect();
  client = new tmi.client(opts);

  // regist handlers
  client.on('connected', onConnected);
  client.on('message', onMessage);
  client.on('join', (channel: string, username: string, self: boolean) => console.log(`channel joined -> ${channel}`));
  client.on('part', (channel: string, username: string, self: boolean) => console.log(`channel leave -> ${channel}`));

  // connect to twitch!
  await client.connect();
};
