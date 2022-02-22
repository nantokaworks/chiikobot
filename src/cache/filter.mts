import { cloneDeep, get, has, set, unset } from 'lodash-es';
import { z } from 'zod';
import { FiltersResult } from '../db/filter/getFilters.mjs';

export const FilterCache = z.record(FiltersResult);
export type FilterCache = z.infer<typeof FilterCache>;

const filterCache: FilterCache = {};

export const hasFilterCache = (channelId: string) => {
  return has(filterCache, channelId);
};

export const getFilterCache = (channelId: string): FiltersResult | undefined => {
  if (!has(filterCache, channelId)) return undefined;
  return cloneDeep(filterCache[channelId]);
};

export const setFilterCache = (channelId: string, filterResult: FiltersResult) => {
  set(filterCache, channelId, cloneDeep(filterResult));
};

export const addFilterCache = (channelId: string, id: string, pattern: string) => {
  if (!has(filterCache, channelId)) set(filterCache, channelId, []);
  const data = cloneDeep(get(filterCache, channelId));
  data.push({ id, pattern });
  set(filterCache, channelId, data);
};

export const removeFilterCache = (channelId: string, id: string) => {
  if (!has(filterCache, channelId)) set(filterCache, channelId, []);
  const data = cloneDeep(get(filterCache, channelId)).filter((value) => value.id !== id);
  set(filterCache, channelId, data);
};

export const unsetFilterCache = (channelId: string) => {
  if (!has(filterCache, channelId)) return;
  unset(filterCache, channelId);
};
