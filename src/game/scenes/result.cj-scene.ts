import { ApiAction } from '../../api/api.action';
import { PgameApi } from '../../api/pgame-api';
import { GameController } from '../game-controller';
import { GameAction } from '../game.action';
import { CjScene } from './cj-scene';

/**
 * Createjs用のRESULT画面
 */
export class ResultCjScene extends CjScene {
  private pageResult: lib.PageResult = new lib.PageResult();
  private blockNumberClip: lib.BlockNumberClip = new lib.BlockNumberClip();

  constructor() {
    super('RESULT');
    // Retryボタン
    this.pageResult.btnRetry.addEventListener('click', () => {
      GameController.dispatch(GameAction.sceneChange({ sceneName: 'GAME' }));
    });
    // Lineボタン
    this.pageResult.btnLine.addEventListener('click', () => {
      GameController.dispatch(ApiAction.run({ api: PgameApi.line_share({ gameUrl: ('https://www.p-game.jp/game000/') }) }));
    });
    // Twitterボタン
    this.pageResult.btnTwitter.addEventListener('click', () => {
      GameController.dispatch(
        ApiAction.run({
          api: PgameApi.twitter_share({
            gameName: ('title'),
            gameScore: GameController.getState().game.gameState.score,
            scoreUnit: ('点'),
            gameUrl: ('https://www.p-game.jp/game000/'),
            gameGenre: ('ジャンル'),
          }),
        }),
      );
    });
  }

  willMount() {
    this.container.addChild(this.pageResult);
    GameController.dispatch(ApiAction.run({ api: PgameApi.ended({ score: 100 }) }));
  }

  didMount() {
    this.pageResult.addChild(this.blockNumberClip);
    this.blockNumberClip.x = 320;
    this.isSP ? this.blockNumberClip.y = 480 : this.blockNumberClip.y = 240;
  }
}
