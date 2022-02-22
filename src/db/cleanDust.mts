import { prepare, run } from './index.mjs';

const stmt = await prepare('DELETE FROM counter_message WHERE threshold IS NULL');

export const cleanDust = async () => {
  return await run(stmt, []);
};
