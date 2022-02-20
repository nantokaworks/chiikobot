import tmi from 'tmi.js';
import { getFilters } from '../db/sql/getFilters';
import { getIgnores } from '../db/sql/getIgnores';

export const isAllowMessage = async (
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
  self: boolean,
  isCommand: boolean,
  isRoot: boolean,
  isOwner: boolean,
) => {
  if (self) return false;
  if (isCommand && (isRoot || isOwner)) return true;

  const userName = userstate.username || '';

  // check ignore
  const ignores = await getIgnores(channel);
  if (ignores.indexOf(userName) !== -1) return false;

  // check filter
  let filterMatched = false;
  const filters = await getFilters(channel);
  for (let i = 0; i < filters.length; i++) {
    const re = new RegExp(filters[i].pattern);
    filterMatched = re.test(message);
    if (filterMatched) break;
  }
  if (filterMatched) return false;

  return true;
};
