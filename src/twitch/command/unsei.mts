import tmi from 'tmi.js';
import { Command, commandOption } from './index.mjs';
import { say } from '../index.mjs';
import { Chance } from 'chance';
import crypto from 'crypto';
import moment from 'moment-timezone';

const MONEY = ['💰', '💰💰', '💰💰💰', '💰💰💰💰', '💰💰💰💰💰'];
const LOVE = ['💗', '💗💗', '💗💗💗', '💗💗💗💗', '💗💗💗💗💗'];
const GAME = ['🔫', '🔫🔫', '🔫🔫🔫', '🔫🔫🔫🔫', '🔫🔫🔫🔫🔫'];
const LUCKY = [
  '隊長ぉぉぉぉぉ',
  '敵なんていないいない！',
  '足の小指に気をつけて！',
  '左手で自販機にお金を入れてみよう',
  '赤信号は全力疾走！？',
  '正露丸を半分に割って飲んでみて',
  'スマホのパスワードを変更しよう',
  'キーボードを買い換えよう！',
  'コロンの外側だけ食べられるかな？',
  'steamで売上ランキング8位のゲームを買う',
  'JumpKingの時間だよ！ね？',
  'コミックを逆さで最後まで読むと運気アップ？',
  'スマホで「ふ」を入力して最初に出てきた候補をチェック',
  '口を半分閉めた状態で水を飲むと運気アップ！',
];

const md5hex = (value: string) => {
  const md5 = crypto.createHash('md5');
  return md5.update(value, 'binary').digest('hex');
};

export const unsei = async (
  command: Command,
  commandOption: commandOption,
  channel: string,
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<boolean> => {
  const userName = userstate.username;
  const displayName = userstate['display-name'] || userName;
  const seedDate = moment.tz('Asia/Tokyo').format('yyyy-MM-DD');
  const seeedStr = `${channel}-${userName}-${seedDate}`;
  const seed = md5hex(seeedStr);

  const random = new Chance(seed);
  const moneyValue = random.pickone(MONEY);
  const loveValue = random.pickone(LOVE);
  const gameValue = random.pickone(GAME);
  const luckyValue = random.pickone(LUCKY);

  say(channel, `${displayName} さんの今日の運勢 -> ${moneyValue}${loveValue}${gameValue} 🔮 ${luckyValue} 🔮`);
  return true;
};
