import { initialize as initializeForDb } from './db/client';
import { initialize as initializeForTwitch } from './twitch';

const channels = await initializeForDb();
await initializeForTwitch(channels);
