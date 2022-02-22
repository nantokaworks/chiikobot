import { prepare, run } from './index.mjs';

const stmtChannel = await prepare(
  `CREATE TABLE IF NOT EXISTS "channel" ("id" text NOT NULL, "join" int NOT NULL DEFAULT '1', "suspend" int NOT NULL DEFAULT '0', PRIMARY KEY (id));`,
);

const stmtCounter = await prepare(
  `CREATE TABLE IF NOT EXISTS "counter" ("channel_id" text NOT NULL,"user_id" text NOT NULL,"user_name" text NOT NULL DEFAULT '''''', "count" bigint NOT NULL DEFAULT '0', PRIMARY KEY (channel_id, user_id));`,
);
const stmtCounterMessage = await prepare(
  `CREATE TABLE IF NOT EXISTS "counter_message" ("channel_id" text,"threshold" int,"name" text, "message" text, PRIMARY KEY (channel_id, "threshold"));`,
);
const stmtFilter = await prepare(
  `CREATE TABLE IF NOT EXISTS "filter" ("id" text NOT NULL, "channel_id" text NOT NULL, "pattern" text NOT NULL, PRIMARY KEY (id));`,
);
const stmtIgnore = await prepare(`CREATE TABLE IF NOT EXISTS "ignore" ("channel_id" text NOT NULL, "user_name" text NOT NULL);`);

const stmtStrictFirstMsg = await prepare(
  `CREATE TABLE IF NOT EXISTS "strict_first_msg" ("channel_id" text NOT NULL,"enabled" integer NOT NULL DEFAULT '1', PRIMARY KEY (channel_id));`,
);

export const createTables = async () => {
  // make tables
  await run(stmtChannel);
  await run(stmtCounter);
  await run(stmtCounterMessage);
  await run(stmtFilter);
  await run(stmtIgnore);
  await run(stmtStrictFirstMsg);
};
