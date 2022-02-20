import tmi from 'tmi.js';
import { commands, Command, commandOption } from '.';
import { client } from '../index';

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
  await client.say(channel, `${lines}`);

  return true;
};
