import { Game } from './game';
import { CjEngine } from './engines/cj.engine';
import { TopCjScene } from './scenes/top.cj-scene';
import { GameCjScene } from './scenes/game.cj-scene';
import { ResultCjScene } from './scenes/result.cj-scene';
import { Store } from '../redux/store';
import { GameAction } from './game.action';
import { Action } from 'typescript-fsa';
import { IStore } from '../redux/root.reducer';
import { ApiAction } from '../api/api.action';
import { PgameApi } from '../api/pgame-api';

/**
 * ゲームを制御するクラス
 * このクラスは「シングルトンパターン」で実装されている
 * ゲーム制御に関わる処理は全てGameControllerを仲介して実行する
 */
class GameControllerClass {
  // - Actionの発行 -
  dispatch = Store.dispatch;
  // - Storeの状態を取得 -
  getState: () => IStore = Store.getState;
  public game: Game | null = null;

  constructor() {}

  dispatchSync(action: Action<any>): Promise<void> {
    return new Promise((resolve) => {
      this.dispatch(
        GameAction.sync({
          action,
          callback: () => {
            resolve();
          },
        })
      );
    });
  }

  /**
   * 最初に動く根幹のメソッド
   *  1. エンジンのプリロード機能に対しコールバックを登録
   *  2. ロード完了後にゲームをインスタンス化する
   *  3. 任意の画面に遷移させ、ゲームを始める
   * @param canvas
   */
  async initialize(canvas: HTMLCanvasElement) {
    console.log('- GameController:initialize -');
    // - type 取得 -
    await this.getType();
    // - env.json 取得 -
    await this.getEnv();
    // - engine -
    const engine = new CjEngine(canvas);
    // - engine:load:error -
    engine.on('load:error', () => {
      this.dispatch(ApiAction.run({ api: PgameApi.loading_fail() }));
    });
    // - engine:loading -
    engine.on('loading', (e) => {
      const { a, b } = e;
      this.dispatch(ApiAction.run({ api: PgameApi.loading({ a, b }) }));
    });
    // - engine:loaded -
    engine.on('loaded', (e) => {
      // - scenes -
      const scenes = [new TopCjScene(), new GameCjScene(), new ResultCjScene()];
      this.dispatch(ApiAction.run({ api: PgameApi.loaded() }));
      engine.initialize();
      // - Game 作成 -
      this.game = new Game({
        engine,
        scenes,
      });
      // - Top画面の作成 -
      this.dispatch(GameAction.sceneChange({ sceneName: 'TOP' }));
    });
    // - engine:load -
    await engine.load();
  }

  /**
   * シーン名で指定した画面に遷移する処理
   * @param sceneName
   * @returns
   */
  changeScene(sceneName: string) {
    if (!this.game) {
      throw new Error('please initialize GameController !!');
    }
    return this.game.changeScene(sceneName).name;
  }

  private async getType() {
    await this.dispatchSync(GameAction.typeSet({ type: (window as any).type ? 'sp' : 'pc' }));
  }

  private getEnv() {
    return new Promise<void>(async (resolve) => {
      await this.dispatch(
        GameAction.envGet({
          callback: () => resolve(),
        })
      );
    });
  }
}

export const GameController = new GameControllerClass();
