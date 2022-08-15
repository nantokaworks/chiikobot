import tmi from 'tmi.js';
import { dice } from './dice.mjs';
import { count } from './count.mjs';
import { command } from './command.mjs';
import { registChannel } from './registChannel.mjs';
import { setCounterMessage } from './setCounterMessage.mjs';
import { countReset, countResetAll } from './countReset.mjs';
import { omikuji } from './omikuji.mjs';
import { leaveChannel } from './leaveChannel.mjs';
import { joinChannel } from './joinChannel.mjs';
import { removeCounterMessage } from './removeCounterMessage.mjs';
import { addIgnore } from './addIgnore.mjs';
import { removeIgnore } from './removeIgnore.mjs';
import { addFilter } from './addFilter.mjs';
import { removeFilter } from './removeFilter.mjs';
import { resume } from './resume.mjs';
import { suspend } from './suspend.mjs';
import { BotCommandError } from '../../error/botError.mjs';
import { setStrictFirstMsg } from './setStrictFirstMsg.mjs';
import { unsei } from './unsei.mjs';
import { clean } from './clean.mjs';
export type Command = {
  command: string;
  handler: (command: Command, commandOption: commandOption, channel: string, userstate: tmi.ChatUserstate, message: string) => Promise<boolean>;
  description: string;
  isOwnerOnly?: boolean;
  isRootOnly?: boolean;
};
export type Commands = Command[];

export type commandOption = { args: string[]; isOwner: boolean; isRoot: boolean };

export const commands: Commands = [
  { command: '!command', handler: command, description: '' },
  { command: '!count', handler: count, description: '!count | !count {{userName}} (owner only): コメントカウントを表示' },
  { command: '!unsei', handler: unsei, description: '!unsei: 今日の運勢' },
  { command: '!omikuji', handler: omikuji, description: '!omikuji: おみくじ' },
  { command: '!dice', handler: dice, description: '!dice: サイコロ' },
  {
    command: '!cm',
    handler: setCounterMessage,
    description: '!cm | !cm {{threshold}} {{name}} {{message}}: message内での使用可能タグ -> {{userName}}, {{displayName}}',
    isOwnerOnly: true,
  },
  {
    command: '!rmcm',
    handler: removeCounterMessage,
    description: '!rmcm {{threshold}}: 指定thresholdのメッセージ削除',
    isOwnerOnly: true,
  },
  {
    command: '!strict',
    handler: setStrictFirstMsg,
    description: '!strict {{0 or 1}}: 初コメを厳格にチェック',
    isOwnerOnly: true,
  },
  { command: '!ignore', handler: addIgnore, description: '!ignore {{userName}}: 無視ユーザー', isOwnerOnly: true },
  { command: '!rmignore', handler: removeIgnore, description: '!rmignore {{userName}}: 無視ユーザー削除', isOwnerOnly: true },
  { command: '!filter', handler: addFilter, description: '!filter {{pattern}}: メッセージフィルター(regexp)', isOwnerOnly: true },
  { command: '!rmfilter', handler: removeFilter, description: '!rmfilter {{id}}: メッセージフィルター削除', isOwnerOnly: true },
  { command: '!cr', handler: countReset, description: '!cr {{userName}} {{count}}: コメントカウントリセット', isOwnerOnly: true },
  { command: '!crall', handler: countResetAll, description: '!crall: 全コメントカウントリセット', isOwnerOnly: true },
  { command: '!resume', handler: resume, description: '!resume: ボットうごけ〜', isOwnerOnly: true },
  { command: '!suspend', handler: suspend, description: '!suspend: ボットやすめ〜(!resumeのみ反応)', isOwnerOnly: true },
  { command: '!join', handler: joinChannel, description: '!join {{channel}}', isRootOnly: true },
  { command: '!leave', handler: leaveChannel, description: '!leave {{channel}}', isRootOnly: true },
  { command: '!regch', handler: registChannel, description: '!regch {{channel}}', isRootOnly: true },
  { command: '!clean', handler: clean, description: '!clean', isRootOnly: true },
];

export const onCommand = async (
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
  self: boolean,
  isRoot: boolean,
  isOwner: boolean,
  isSuspend: boolean,
): Promise<boolean> => {
  // find command
  const values = message.split(' ');
  const commandStr = values[0].toLowerCase().trim();
  const targets = commands.filter((value) => value.command === commandStr);
  const command = targets.length > 0 ? targets[0] : undefined;

  // run command if exists
  if (command) {
    // only !resume comannd when suspended
    if (isSuspend && command?.command !== '!resume') return false;
    if (command.isOwnerOnly && !isOwner) return false;
    if (command.isRootOnly && !isRoot) return false;
    const option: commandOption = {
      args: message.split(' ').splice(1),
      isRoot,
      isOwner,
    };
    if (!command.isRootOnly || (command.isRootOnly && isRoot)) {
      await command.handler(command, option, channel, userstate, message).catch((e) => {
        throw new BotCommandError(e);
      });
    }
  }
  return false;
};
