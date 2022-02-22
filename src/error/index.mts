import './errorHandler.mjs';
import { BotUnknownError } from './botError.mjs';

process.on('uncaughtException', (e) => console.error(new BotUnknownError(e)));
