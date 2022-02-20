import { toNumber } from 'lodash-es';
import tmi from 'tmi.js';
import { Command, commandOption } from '.';
import { client } from '../index';
import { deleteCounterMessage } from '../../db/sql/deleteCounterMessage';

export const removeCounterMessage = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const { args } = commandOption;
  if (args.length < 1) {
    await client.say(channel, command.description);
    return false;
  }
  const threshold = toNumber(args[0]);
  await deleteCounterMessage(channel, threshold);
  await client.say(channel, `delete counter message -> threshold: ${threshold}`);

  return true;
};
