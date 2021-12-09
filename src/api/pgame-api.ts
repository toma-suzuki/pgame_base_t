import { PgameApiBase } from './pgame-api-base';
import { Store } from '../redux/store';
import { GameAction } from '../game/game.action';

type ParamLoading = { a: number; b: number };
type ParamEnded = { score: number };
export type ParamLine = { gameUrl: string };
export type ParamTwitterShare = { gameName: string, gameScore: number, scoreUnit: string, gameUrl: string, gameGenre: string };

const exportTwitterApi = () => {
  (window as any).pgame_fw_twitter_share = (
    gameName: string, gameScore: number, scoreUnit: string, gameUrl: string, gameGenre: string,
  ) => {
    const text = `${gameName || ''}で ${gameScore || '0'}${scoreUnit || ''} を獲得！`;
    const url = `http://twitter.com/share?url=${gameUrl}&text=${text}&hashtags=プチゲーム,無料ゲーム,${gameGenre || ''},${gameName || ''}&related=pgame_jp`;
    window.open(url, '_blank', 'width=600,height=400');
  };
};
exportTwitterApi();

/**
 * 指定したAPIを生成するオブジェクト
 */
export const PgameApi = {
  /** ロード中 a/b */
  loading: (param: ParamLoading) => new PgameApiBase({ ...param }, 'pgame_fw_loading'),

  /** ロード終了 */
  loaded: () => new PgameApiBase({}, 'pgame_fw_loaded'),

  /** ロード失敗 */
  loading_fail: () => new PgameApiBase({}, 'pgame_fw_loading_fail'),

  /** スタート */
  started: () => {
    Store.dispatch(GameAction.statusSet({ status: 'running' }));
    return new PgameApiBase({}, 'pgame_fw_started');
  },

  /** プレイ回数 +1 */
  playcountup: () => new PgameApiBase({}, 'pgame_fw_playcountup'),

  /** ゲーム終了 */
  ended: (param: ParamEnded) => new PgameApiBase<ParamEnded>({ ...param }, 'pgame_fw_ended'),

  /** 広告ポップアップ表示 */
  adPopUp: () => new PgameApiBase({}, 'pgame_fw_ad_popup'),

  /** ラインシェア */
  line_share: (param: ParamLine) => new PgameApiBase({ ...param }, 'pgame_fw_line_share'),

  /** Twitter シェア */
  twitter_share: (param: ParamTwitterShare) => new PgameApiBase({ ...param }, 'pgame_fw_twitter_share'),
};
