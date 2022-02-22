import { prepare, run } from './index.mjs';

const stmtChannel = await prepare(
  `CREATE TABLE "channel" ("id" text NOT NULL, "join" int NOT NULL DEFAULT '1', "suspend" int NOT NULL DEFAULT '0', PRIMARY KEY (id));`,
);

const stmtCounter = await prepare(
  `CREATE TABLE "counter" ("channel_id" text NOT NULL,"user_id" text NOT NULL,"user_name" text NOT NULL DEFAULT '''''', "count" bigint NOT NULL DEFAULT '0', PRIMARY KEY (channel_id, user_id));`,
);
const stmtCounterMessage = await prepare(
  `CREATE TABLE "counter_message" ("channel_id" text,"threshold" int,"name" text, "message" text, PRIMARY KEY (channel_id, "threshold"));`,
);
const stmtFilter = await prepare(
  `CREATE TABLE "filter" ("id" text NOT NULL, "channel_id" text NOT NULL, "pattern" text NOT NULL, PRIMARY KEY (id));`,
);
const stmtIgnore = await prepare(`CREATE TABLE "ignore" ("channel_id" text NOT NULL, "user_name" text NOT NULL);`);

export const createTables = async () => {
  // make tables
  await run(stmtChannel);
  await run(stmtCounter);
  await run(stmtCounterMessage);
  await run(stmtFilter);
  await run(stmtIgnore);
};
