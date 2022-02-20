import { initialize as initializeForDb } from './db/client.mjs';
import { initialize as initializeForTwitch } from './twitch/index.mjs';

const channels = await initializeForDb();
await initializeForTwitch(channels);
