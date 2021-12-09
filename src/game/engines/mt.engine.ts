import { Engine } from './engine';

type Hoge = {};

export class MtEngine extends Engine<Hoge> {

  stage: Hoge;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.stage = '';
  }

  initialize(): void {
  }

  render(): void {
  }

  destroy(): void {
  }

}
