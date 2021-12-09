import { ApiAction } from '../../api/api.action';
import { PgameApi } from '../../api/pgame-api';
import { GameController } from '../game-controller';
import { GameAction } from '../game.action';
import { CjScene } from './cj-scene';

/**
 * Createjs用のGAME画面
 */
export class GameCjScene extends CjScene {
  private pageGame: lib.PageGame = new lib.PageGame();
  private numberClip: lib.NumberClip = new lib.NumberClip();

  constructor() {
    super('GAME');
    // Nextボタン
    this.pageGame.btnNext.addEventListener('click', async () => {
      await GameController.dispatchSync(
        GameAction.gameStateSet({
          gameState: {
            ...GameController.getState().game.gameState,
            score: 100,
          },
        }),
      );
      GameController.dispatch(GameAction.sceneChange({ sceneName: 'RESULT' }));
    });
  }

  willMount() {
    this.container.addChild(this.pageGame);
    GameController.dispatch(ApiAction.run({ api: PgameApi.started() }));
    GameController.dispatch(ApiAction.run({ api: PgameApi.playcountup() }));
  }

  didMount() {
    this.pageGame.addChild(this.numberClip);
    this.isSP ? this.numberClip.x = 325 : this.numberClip.x = 100;
    this.isSP ? this.numberClip.y = 115 : this.numberClip.y = 105;
  }
}
