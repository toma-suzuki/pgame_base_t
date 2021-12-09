import { EventEmitter } from 'eventemitter3';
import { LogDecorator } from './log-decorator';
import { MathHelper } from './math-helper';

export type Manifest = { src: string, id: string, type: string }[];

type PreloaderEvent = {
  'error': (e: any) => void,
  'progress': (e: any) => void,
  'file-load': (e: any) => void,
  'complete': (e: any) => void,
};

type LoadOption = {
  /** キャッシュを防ぐための文字列 (バージョン番号とか) */
  cachePrefix: string,
};

export class Preloader extends EventEmitter<PreloaderEvent> {

  private static MAX_CONNECTIONS = 6;

  private loader: createjs.LoadQueue;

  constructor() {
    super();
    this.loader = new createjs.LoadQueue(false);
    this.loader.setMaxConnections(Preloader.MAX_CONNECTIONS);
    this.loader.addEventListener('error', (e) => {
      console.groupCollapsed(...LogDecorator('[<red>load</red>] <gray>error</gray>'));
      this.emit('error', e);
      console.groupEnd();
    });
    this.loader.addEventListener('progress', (e) => {
      const percent = MathHelper.round((e as any).progress * 100, 2);
      console.groupCollapsed(...LogDecorator(`[<green>load</green>] <gray>progress ${percent}％</gray>`));
      this.emit('progress', e);
      console.groupEnd();
    });
    this.loader.addEventListener('fileload', (e) => {
      console.groupCollapsed(...LogDecorator('[<green>load</green>] <gray>file load</gray>'));
      this.emit('file-load', e);
      console.groupEnd();
    });
    this.loader.addEventListener('complete', (e) => {
      console.groupCollapsed(...LogDecorator('[<green>load</green>] <gray>complete</gray>'));
      this.emit('complete', e);
      console.groupEnd();
    });
  }

  load(manifest: Manifest, option?: LoadOption): void {
    console.groupCollapsed(...LogDecorator('[<green>load</green>] <gray>start</gray>'));
    console.log('manifest : ', manifest);
    console.log('option   : ', option);
    console.groupEnd();
    const cachePrefix = option?.cachePrefix || '';
    let convertedManifest = this.convertManifest(manifest, cachePrefix);
    this.loader.loadManifest(convertedManifest);
  }

  loadSync(manifest: Manifest, option?: LoadOption): Promise<void> {
    console.groupCollapsed(...LogDecorator('[<green>load sync</green>] <gray>start</gray>'));
    console.log('manifest : ', manifest);
    console.log('option   : ', option);
    console.groupEnd();
    const cachePrefix = option?.cachePrefix || '';
    let convertedManifest = this.convertManifest(manifest, cachePrefix);
    return new Promise((resolve) => {
      const callback = () => {
        this.loader.removeEventListener('complete', callback);
        resolve();
      };
      this.loader.addEventListener('complete', callback);
      this.loader.loadManifest(convertedManifest);
    });
  }

  private convertManifest(manifest: Manifest, prefix: string): Manifest {
    const cachePrefix = prefix;
    if (!prefix) {
      return manifest;
    }
    return manifest.map((v: any) => ({
      ...v,
      src: `${v.src}?cache=${cachePrefix}`,
    }));
  }

}
