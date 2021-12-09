import { Engine } from '../engines/engine';
import { StageType } from '../game';

/**
 * Scene
 */
export abstract class Scene {
  protected constructor(public name: string) {}

  /**
   * Mount前
   */
  public willMount() {}

  /**
   *  Mount後
   */
  public didMount() {}

  /**
   * 画面のマウント
   * @param engine
   */
  abstract mount(engine: Engine<StageType>): void;

  /**
   * 画面のアンマウント
   * @param engine
   */
  abstract unMount(engine: Engine<StageType>): void;

  /**
   * UnMount前
   */
  public willUnMount() {}

  /**
   * UnMount後
   */
  public didUnMount() {}
}
