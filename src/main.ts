import { GameController } from './game/game-controller';
import { Store } from './redux/store';
import { GameAction } from './game/game.action';

const main = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) {
    throw new Error('canvas is not found !!');
  }
  GameController.initialize(canvas);
  // - プチゲームフレームワーク用メソッドの展開 その1 -
  (window as any).pgame = {};
  // - プチゲームフレームワーク用メソッドの展開 その2 -
  // -- pgame_pause() メソッドの中から呼ばれる --
  (window as any).pgame.gameManager = () => ({
    setStopState: () => {
      Store.dispatch(GameAction.statusSet({ status: 'pause' }));
    },
    setRunState: () => {
      Store.dispatch(GameAction.statusSet({ status: 'running' }));
    },
  });
};

(window as any).init = () => {
  main();
};
