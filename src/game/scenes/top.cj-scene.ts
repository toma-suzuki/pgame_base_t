import { GameController } from '../game-controller';
import { GameAction } from '../game.action';
import { CjScene } from './cj-scene';

/**
 * Createjs用のTOP画面
 */
export class TopCjScene extends CjScene {
  private pageTop: lib.PageTop = new lib.PageTop();
  private pageHowTo: lib.PageHowTo = new lib.PageHowTo();

  constructor() {
    super('TOP');
    // Startボタン
    this.pageTop.btnStart.addEventListener('click', () => {
      GameController.dispatch(GameAction.sceneChange({ sceneName: 'GAME' }));
    });
    // HowToボタン
    this.pageTop.btnHowTo.addEventListener('click', () => {
      createjs.Tween.get(this.pageTop)
        .to({ alpha: 0 }, 500);
    });
    // HowToのStartボタン
    this.pageHowTo.btnStartFromHowTo.addEventListener('click', () => {
      GameController.dispatch(GameAction.sceneChange({ sceneName: 'GAME' }));
    });
  }

  willMount() {
    this.container.addChild(this.pageHowTo);
    this.container.addChild(this.pageTop);
  }

  didMount() {

  }
}
