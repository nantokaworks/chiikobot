import { has, set, unset } from 'lodash-es';
import { z } from 'zod';
import { StrictFirstMsgResult } from '../db/strictFirstMsg/getStrictFirstMsg.mjs';

export const StrictFirstMsgCache = z.record(StrictFirstMsgResult);
export type StrictFirstMsgCache = z.infer<typeof StrictFirstMsgCache>;

const strictFirstMsgCache: StrictFirstMsgCache = {};

export const getStrictFirstMsgCache = (channelId: string): StrictFirstMsgResult | undefined => {
  if (!has(strictFirstMsgCache, channelId)) return { enabled: 1 };
  return strictFirstMsgCache[channelId];
};

export const setStrictFirstMsgCache = (channelId: string, data: StrictFirstMsgResult) => {
  set(strictFirstMsgCache, channelId, data);
};

export const unsetStrictFirstMsgCache = (channelId: string) => {
  if (!has(strictFirstMsgCache, channelId)) return;
  unset(strictFirstMsgCache, channelId);
};
