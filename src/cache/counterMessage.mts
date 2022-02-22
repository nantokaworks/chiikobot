import { cloneDeep, get, has, set, unset } from 'lodash-es';
import { z } from 'zod';
import { CounterMessagesResult } from '../db/counterMessage/getCounterMessage.mjs';

export const CounterMessageCache = z.record(CounterMessagesResult);
export type CounterMessageCache = z.infer<typeof CounterMessageCache>;

const cmCache: CounterMessageCache = {};

export const hasCounterMessageCache = (channelId: string) => {
  return has(cmCache, channelId);
};

export const getCounterMessagesCache = (channelId: string): CounterMessagesResult | undefined => {
  if (!has(cmCache, channelId)) return undefined;
  return cloneDeep(cmCache[channelId]);
};

export const setCounterMessagesCache = (channelId: string, filterResult: CounterMessagesResult) => {
  set(cmCache, channelId, cloneDeep(filterResult));
};

export const findCounterMessageCache = (channelId: string, threshold: number) => {
  if (!has(cmCache, channelId)) set(cmCache, channelId, []);
  const datas = get(cmCache, channelId).filter((value) => value.threshold === threshold);
  if (datas.length === 0) return undefined;
  return cloneDeep(datas[0]);
};

export const addCounterMessageCache = (channelId: string, threshold: number, name: string, message: string) => {
  if (!has(cmCache, channelId)) set(cmCache, channelId, []);
  const data = cloneDeep(get(cmCache, channelId));
  data.push({ threshold, name, message });
  set(cmCache, channelId, data);
};

export const removeCounterMessageCache = (channelId: string, threshold: number) => {
  if (!has(cmCache, channelId)) return;
  const data = get(cmCache, channelId).filter((value) => value.threshold !== threshold);
  set(cmCache, channelId, cloneDeep(data));
};

export const unsetCounterMessageCache = (channelId: string) => {
  if (!has(cmCache, channelId)) return;
  unset(cmCache, channelId);
};
