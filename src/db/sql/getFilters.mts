import { z } from 'zod';
import { all } from '../client.mjs';

export const Filter = z.object({
  id: z.string(),
  pattern: z.string(),
});

export const GetFiltersResult = z.array(Filter);
export type GetFiltersResult = z.infer<typeof GetFiltersResult>;

export const getFilters = async (channelId: string) => {
  const tmpChannelId = channelId.startsWith('#') ? channelId : `#${channelId}`;
  const res = await all(`SELECT id, pattern FROM filter WHERE channel_id = ?`, [tmpChannelId]);
  return GetFiltersResult.parse(res);
};
