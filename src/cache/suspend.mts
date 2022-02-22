import { has, set, unset } from 'lodash-es';
import { z } from 'zod';
import { SuspendResult } from '../db/channel/getSuspend.mjs';

export const SuspendCache = z.record(SuspendResult);
export type SuspendCache = z.infer<typeof SuspendCache>;

const suspendCache: SuspendCache = {};

export const getSuspendCache = (channelId: string): SuspendResult | undefined => {
  if (!has(suspendCache, channelId)) return undefined;
  return suspendCache[channelId];
};

export const setSuspendCache = (channelId: string, suspend: SuspendResult) => {
  set(suspendCache, channelId, suspend);
};

export const unsetSuspendCache = (channelId: string) => {
  if (!has(suspendCache, channelId)) return;
  unset(suspendCache, channelId);
};
