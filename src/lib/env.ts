if (!process.env.TWITCH_TOKEN) throw new Error('please set environment -> TWITCH_TOKEN');
if (!process.env.TWITCH_BOT_NAME) throw new Error('please set environment -> TWITCH_BOT_NAME');
if (!process.env.TWITCH_ROOT_CHANNEL) throw new Error('please set environment -> TWITCH_ROOT_CHANNEL');

export const TWITCH_TOKEN = process.env.TWITCH_TOKEN;
export const TWITCH_BOT_NAME = process.env.TWITCH_BOT_NAME;
export const TWITCH_ROOT_CHANNEL = process.env.TWITCH_ROOT_CHANNEL;
