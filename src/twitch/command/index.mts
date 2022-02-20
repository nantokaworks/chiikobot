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
];
