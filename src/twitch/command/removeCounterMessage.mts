import { toNumber } from 'lodash-es';
import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';
import { deleteCounterMessage } from '../../db/counterMessage/deleteCounterMessage.mjs';

export const removeCounterMessage = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args } = commandOption;
  if (args.length < 1) {
    await say(channel, command.description);
    return false;
  }
  const threshold = toNumber(args[0]);
  await deleteCounterMessage(channel, threshold);
  await say(channel, `delete counter message -> threshold: ${threshold}`);

  return true;
};
