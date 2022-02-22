import { channelExists } from './channel/channelExists.mjs';
import { insertChannel } from './channel/insertChannel.mjs';
import { Channels, getJoinChannels } from './channel/getJoinChannels.mjs';
import { createTables } from './createTables.mjs';
import { TWITCH_ROOT_CHANNEL } from '../lib/env.mjs';
import { isDBFileExists } from './index.mjs';

export const initialize = async (): Promise<Channels> => {
  // if dbfile does not exist, create default tables
  if (!isDBFileExists) {
    await createTables();
    console.log('database create');
  }

  // insert root channel
  const rootChannelExists = await channelExists(TWITCH_ROOT_CHANNEL);
  if (!rootChannelExists) {
    await insertChannel(TWITCH_ROOT_CHANNEL);
  }

  // get channelExists
  const channels = await getJoinChannels();
  return channels;
};
