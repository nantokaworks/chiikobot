import './error/index.mjs';
import './cache/index.mjs';
import './db/index.mjs';
import { initialize as initializeForDb } from './db/initialize.mjs';
import { initialize as initializeForTwitch } from './twitch/initialize.mjs';

try {
  console.log('🔫start initializing...');
  const channels = await initializeForDb();
  await initializeForTwitch(channels);
  console.log('🎉initialize done!');
} catch (e) {
  console.error(`❌bot could not start -> `, e);
}
