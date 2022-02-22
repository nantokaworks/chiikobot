import { cloneDeep, get, has, set, unset } from 'lodash-es';
import { z } from 'zod';
import { IgnoreResult } from '../db/ignore/getIgnores.mjs';

export const IgnoreCache = z.record(IgnoreResult);
export type IgnoreCache = z.infer<typeof IgnoreCache>;

const ignoreCache: IgnoreCache = {};

export const hasIgnoreCache = (channelId: string) => {
  return has(ignoreCache, channelId);
};

export const getIgnoreCache = (channelId: string): IgnoreResult | undefined => {
  if (!has(ignoreCache, channelId)) return undefined;
  return cloneDeep(ignoreCache[channelId]);
};

export const setIgnoreCache = (channelId: string, ignoreResult: IgnoreResult) => {
  set(ignoreCache, channelId, cloneDeep(ignoreResult));
};

export const addIgnoreCache = (channelId: string, userName: string) => {
  if (!has(ignoreCache, channelId)) set(ignoreCache, channelId, []);
  const data = cloneDeep(get(ignoreCache, channelId));
  data.push(userName);
  set(ignoreCache, channelId, data);
};

export const removeIgnoreCache = (channelId: string, userName: string) => {
  if (!has(ignoreCache, channelId)) set(ignoreCache, channelId, []);
  const data = cloneDeep(get(ignoreCache, channelId)).filter((value) => value !== userName);
  set(ignoreCache, channelId, data);
};

export const unsetIgnoreCache = (channelId: string) => {
  if (!has(ignoreCache, channelId)) return;
  unset(ignoreCache, channelId);
};
