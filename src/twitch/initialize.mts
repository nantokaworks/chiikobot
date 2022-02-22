import tmi from 'tmi.js';
import { Channels } from '../db/channel/getJoinChannels.mjs';
import { TWITCH_BOT_NAME, TWITCH_TOKEN } from '../lib/env.mjs';
import { createClient, onConnected, onJoined, onMessage, onParted } from './index.mjs';

export const initialize = async (channelList: Channels) => {
  // listup channels
  const channels = channelList.map((channel) => channel.id);

  // twitch connection options
  const opts: tmi.Options = {
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
  const client = createClient(opts);

  // regist handlers
  client.on('connected', onConnected);
  client.on('message', onMessage);
  client.on('join', onJoined);
  client.on('part', onParted);

  // connect to twitch!
  await client.connect();
};
