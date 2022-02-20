import { run } from '../client.mjs';

export const createTables = async () => {
  // make tables
  await run(`CREATE TABLE "channel" ("id" text NOT NULL, "join" int NOT NULL DEFAULT '1', "suspend" int NOT NULL DEFAULT '0', PRIMARY KEY (id));`);
  await run(
    `CREATE TABLE "counter" ("channel_id" text NOT NULL,"user_id" text NOT NULL,"user_name" text NOT NULL DEFAULT '''''', "count" bigint NOT NULL DEFAULT '0', PRIMARY KEY (channel_id, user_id));`,
  );
  await run(`CREATE TABLE "counter_message" ("channel_id" text,"threshold" int,"name" text, "message" text, PRIMARY KEY (channel_id, "threshold"));`);
  await run(`CREATE TABLE "filter" ("id" text NOT NULL, "channel_id" text NOT NULL, "pattern" text NOT NULL, PRIMARY KEY (id));`);
  await run(`CREATE TABLE "ignore" ("channel_id" text NOT NULL, "user_name" text NOT NULL);`);
};
