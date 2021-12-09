import { Engine } from './engine';
import { GameController } from '../game-controller';
import { LogDecorator } from '../../utilities/log-decorator';
import { Preloader } from '../../utilities/preloader';

type Manifest = { src: string; id: string; type: string }[];

export type CjStageType = createjs.Stage;

/**
 * Createjsを実装するクラス
 */
export class CjEngine extends Engine<CjStageType> {
  // - AnimateCCから書き出されたPC版id -
  private static COMPOSITION_PC = '22A39DC83079432BB23403B040ECA6C4';
  // - AnimateCCから書き出されたSP版id -
  private static COMPOSITION_SP = '235237728A5628459F398B3B054DFB64';
  stage: CjStageType;

  /**
   * stageの生成、mouseEnabledの有効化
   */
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.stage = new createjs.Stage(canvas);
    this.stage.enableMouseOver();
    if (createjs.Touch.isSupported()) {
      createjs.Touch.enable(this.stage);
    }
  }

  initialize(): void {
    this.render();
  }

  async load() {
    const buildNo = GameController.getState().game.buildNo;
    let retryCounter = 0;
    const errorManifest: Manifest = [];
    // - type -
    const { type } = GameController.getState().game;
    // - PC or SP -
    const isPc = type === 'pc';
    // - AnimateCC の書き出した JavaScript の読み込み -
    await new Preloader()
      .loadSync([
        { src: isPc ? 'jsgame/pgame_canvas_pc.js' : 'jsgame/pgame_canvas_sp.js', id: 'assets', type: 'javascript' },
      ], { cachePrefix: String(buildNo || '') });
    // - composition -
    const composition = (window as any).AdobeAn.getComposition(isPc ? CjEngine.COMPOSITION_PC : CjEngine.COMPOSITION_SP);
    // - lib -
    const lib = composition.getLibrary();
    // - イベントハンドラー -
    const loader = new Preloader();
    // -- エラー発生時 --
    const onError = (e: any) => {
      const findIndex = errorManifest.findIndex((v) => v.id === e.data.id);
      if (findIndex !== -1) {
        errorManifest.splice(findIndex, 1);
      }
      errorManifest.push({
        src: e.data.src,
        id: e.data.id,
        type: e.data.type || 'image',
      });
    };
    // -- 進行時 --
    const onProgress = (e: any) => {
      const a: number = e.progress * 100;
      const b = 100;
      this.emit('loading', { a, b });
    };
    // -- 1ファイル読み込み終了時 --
    const onFileLoad = (e: any, comp: any) => {
      const findIndex = errorManifest.findIndex((v) => v.id === e.item.id);
      if (findIndex !== -1) {
        errorManifest.splice(findIndex, 1);
      }
      const images = comp.getImages();
      if (e && e.item.type === 'image') {
        images[e.item.id] = e.result;
      }
    };
    // -- 全ファイル読み込み終了時 --
    const onComplete = (e: any, comp: any) => {
      if (errorManifest.length && retryCounter < 3) {
        // --- リトライ ---
        console.groupCollapsed(...LogDecorator('[<red>load</red>] <gray>retry start !!</gray>'));
        console.log('target : ', errorManifest);
        console.log('count  : ', retryCounter);
        console.groupEnd();
        e.currentTarget.removeAllEventListeners('fileload');
        e.currentTarget.removeAllEventListeners('complete');
        e.currentTarget.removeAllEventListeners('progress');
        loader.load(errorManifest);
        retryCounter += 1;
        return;
      }
      if (errorManifest.length && retryCounter >= 3) {
        // --- リトライでも失敗 ---
        console.groupCollapsed(...LogDecorator('[<red>load</red>] <gray>retry failed !!</gray>'));
        console.log('target : ', errorManifest);
        console.log('count  : ', retryCounter);
        console.groupEnd();
        this.emit('load:error');
        return;
      }
      // --- ロード完了 ---
      console.groupCollapsed(...LogDecorator('[<green>load</green>] <gray>success</gray>'));
      console.log('target : ', errorManifest);
      console.log('count  : ', retryCounter);
      console.groupEnd();
      const lib = comp.getLibrary();
      // --- スプライトシート対応 ---
      const queue = e.target;
      const ss = comp.getSpriteSheet();
      const ssMetadata = lib.ssMetadata;
      for (let i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({
          images: [queue.getResult(ssMetadata[i].name)],
          frames: ssMetadata[i].frames,
        });
      }
      // --- 謎の処理 ---
      (window as any).AdobeAn.compositionLoaded(lib.properties.id);
      // --- lib の展開 ---
      (window as any).lib = lib;
      // --- fps 設定 ---
      createjs.Ticker.framerate = lib.properties.fps;
      // --- loaded イベントの発火 ---
      this.emit('loaded', this);
    };
    // - ローダー -
    loader.addListener('error', (e) => onError(e));
    loader.addListener('progress', (e) => onProgress(e));
    loader.addListener('file-load', (e) => onFileLoad(e, composition));
    loader.addListener('complete', (e) => onComplete(e, composition));
    loader.load(lib.properties.manifest, { cachePrefix: String(buildNo || '') });
  }

  /**
   * stageを更新してcanvasに描画
   */
  public render(): void {
    this.stage.update();
    requestAnimationFrame(() => {
      this.render();
    });
  }

  public destroy(): void {
  }

}
