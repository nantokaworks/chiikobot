import { dbFile } from '../lib/datafile.mjs';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import { channelExists } from './sql/channelExists.mjs';
import { createTables } from './sql/createTables.mjs';
import { insertChannel } from './sql/insertChannel.mjs';
import { TWITCH_ROOT_CHANNEL } from '../lib/env.mjs';
import { Channels, getJoinChannels } from './sql/getJoinChannels.mjs';
const verbose = sqlite3.verbose();

const exists = fs.existsSync(dbFile);
export const db = new verbose.Database(dbFile);

export const get = (sql: string, params?: any) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const all = (sql: string, params?: any) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

export const run = (sql: string, params?: any) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
};

export const initialize = async (): Promise<Channels> => {
  return new Promise((resolve, reject) => {
    // if dbfile does not exist, create default tables
    db.serialize(async () => {
      try {
        if (!exists) {
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

        resolve(channels);
      } catch (e) {
        reject(e);
      }
    });
  });
};
