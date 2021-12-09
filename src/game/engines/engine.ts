import { EventEmitter } from 'eventemitter3';

type EventType = {
  loading: (e: { a: number; b: number }) => void;
  loaded: (e: Engine<any>) => void;
  'load:error': () => void;
};

/**
 * ゲームの描画等を行うクラス
 */
export abstract class Engine<StageType> extends EventEmitter<EventType> {
  abstract stage: StageType;

  protected constructor(public canvas: HTMLCanvasElement) {
    super();
  }

  /**
   * ライブラリの初期化等を行う
   */
  protected abstract initialize(): void;

  /**
   * canvas に描画
   */
  abstract render(): void;

  /**
   * 破棄
   */
  abstract destroy(): void;
}
