import { Scene } from "./scene";
import { CjEngine } from "../engines/cj.engine";
import { GameController } from '../game-controller';

/**
 * Createjs用のSceneの追加・削除を行うクラス
 */
export class CjScene extends Scene {
  protected container: createjs.Container;
  protected isSP: boolean;

  constructor(name: string) {
    super(name);
    this.container = new createjs.Container();

    // - type -
    const { type } = GameController.getState().game;
    // - PC or SP -
    this.isSP = type === 'sp';
  }

  /**
   * 画面遷移時に新しいContainerを追加
   * @param engine
   */
  mount(engine: CjEngine) {
    console.log('- mount -');
    engine.stage.addChild(this.container);
  }

  /**
   * 画面遷移時に古いContainerを削除
   * @param engine
   */
  unMount(engine: CjEngine) {
    console.log('- un mount -');
    engine.stage.removeAllEventListeners();
    engine.stage.removeAllChildren();
  }
}
