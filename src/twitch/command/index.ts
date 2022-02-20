import tmi from 'tmi.js';
import { dice } from './dice';
import { count } from './count';
import { command } from './command';
import { registChannel } from './registChannel';
import { setCounterMessage } from './setCounterMessage';
import { active } from './active';
import { inactive } from './inactive';
import { countClear, countClearAll } from './countClear';
import { kuji } from './kuji';
import { leaveChannel } from './leaveChannel';
import { joinChannel } from './joinChannel';
import { removeCounterMessage } from './removeCounterMessage';
import { addIgnore } from './addIgnore';
import { removeIgnore } from './removeIgnore';
import { addFilter } from './addFilter';
import { removeFilter } from './removeFilter';
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
  { command: '!count', handler: count, description: '!count | !count <user> (owner only): コメントカウントを表示' },
  { command: '!kuji', handler: kuji, description: '!kuji: おみくじ' },
  { command: '!dice', handler: dice, description: '!dice: サイコロ' },
  {
    command: '!cm',
    handler: setCounterMessage,
    description: '!cm | !cm <threshold> <name> <message>: message内での使用可能タグ -> <user>',
    isOwnerOnly: true,
  },
  {
    command: '!rmcm',
    handler: removeCounterMessage,
    description: '!rmcm <threshold>: 指定thresholdのメッセージ削除',
    isOwnerOnly: true,
  },
  { command: '!ignore', handler: addIgnore, description: '!ignore <user>: 無視ユーザー', isOwnerOnly: true },
  { command: '!rmignore', handler: removeIgnore, description: '!rmignore <user>: 無視ユーザー削除', isOwnerOnly: true },
  { command: '!filter', handler: addFilter, description: '!filter <pattern>: メッセージフィルター(regexp)', isOwnerOnly: true },
  { command: '!rmfilter', handler: removeFilter, description: '!rmfilter <id>: メッセージフィルター削除', isOwnerOnly: true },
  { command: '!cc', handler: countClear, description: '!cc <user>: コメントカウントクリア', isOwnerOnly: true },
  { command: '!ccall', handler: countClearAll, description: '!ccall: 全コメントカウントクリア', isOwnerOnly: true },
  { command: '!active', handler: active, description: '!active: ボットうごけ〜', isOwnerOnly: true },
  { command: '!inactive', handler: inactive, description: '!inactive: ボットやすめ〜', isOwnerOnly: true },
  { command: '!join', handler: joinChannel, description: '!join <channel>', isRootOnly: true },
  { command: '!leave', handler: leaveChannel, description: '!leave <channel>', isRootOnly: true },
  { command: '!regch', handler: registChannel, description: '!regch <channel>', isRootOnly: true },
];
