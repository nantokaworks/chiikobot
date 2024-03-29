import tmi from 'tmi.js';
import { commands, Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';

export const command = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { isRoot, isOwner } = commandOption;
  const lines = commands
    .map((command) => {
      if (command.description === '') return null;
      if (command.isOwnerOnly && !isOwner) return null;
      if (command.isRootOnly && !isRoot) return null;

      let suffix = '';
      if (command.isOwnerOnly) suffix = ' (owner only)';
      if (command.isRootOnly) suffix = ' (root only)';

      return `${command.description}${suffix}`;
    })
    .filter((value) => value !== null)
    .join(' / ');
  await say(channel, `詳しくはコチラ - > https://bit.ly/3BzgEhg / ${lines}`);

  return true;
};
