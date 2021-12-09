import { Engine } from './engines/engine';
import { Scene } from './scenes/scene';
import { CjStageType } from './engines/cj.engine';
import { LogDecorator } from '../utilities/log-decorator';

export type StageType = CjStageType;

type GameParam = {
  engine: Engine<StageType>;
  scenes: Scene[];
};

/**
 * EngineとSceneで構成された、ゲーム全体に関わるクラス
 */
export class Game {
  public engine: Engine<StageType>;
  private scenes: Scene[];
  private currentScene: Scene | null;

  constructor(param: GameParam) {
    this.engine = param.engine;
    this.scenes = param.scenes;
    this.currentScene = null;
  }

  /**
   * ライフサイクルに基づいてSceneを入れ替える処理
   * @param sceneName
   * @returns 新しいScene
   */
  public changeScene(sceneName: string) {
    const oldScene = this.currentScene;
    const newScene = this.scenes.find((v) => v.name === sceneName);
    if (!newScene) {
      throw new Error(`scene (${sceneName}) is not found !!`);
    }
    console.group(...LogDecorator(`[<green>change</green>] <gray>${oldScene?.name || ''} -> ${newScene.name}</gray>`));
    // - Life Cycle -
    // -- 1. 旧シーンの WillUnMount --
    oldScene?.willUnMount();
    // -- 2. 新シーンの WillMount --
    newScene.willMount();
    // -- 3. 旧シーンの UnMount --
    oldScene?.unMount(this.engine);
    // -- 4. 新シーンの Mount --
    newScene.mount(this.engine);
    // -- 5. 旧シーンの DidUnMount --
    oldScene?.didUnMount();
    // -- 6. 新シーンの DidMount --
    newScene.didMount();
    // -- 7. シーンの保持 --
    this.currentScene = newScene;
    console.groupEnd();
    return newScene;
  }
}
