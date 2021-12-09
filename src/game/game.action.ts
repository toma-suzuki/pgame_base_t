import actionCreatorFactory, { Action } from 'typescript-fsa';
import { GameState, Status } from './game.reducer';

type Env = { version: string; buildNo: number; mode: 'local' | 'dev' | 'prod' };

const ActionCreator = actionCreatorFactory('game');

/**
 * 全てのActionを定義
 */
export const GameAction = {
  sync: ActionCreator<{ action: Action<any>; callback: () => void }>('sync'),
  envGet: ActionCreator<{ callback: (v: Env) => void }>('env/get'),
  envSet: ActionCreator<Env>('env/set'),
  typeSet: ActionCreator<{ type: 'pc' | 'sp' }>('type/set'),
  sceneChange: ActionCreator<{ sceneName: string }>('scene/change'),
  sceneNameSet: ActionCreator<{ sceneName: string }>('scene-name/set'),
  gameStateSet: ActionCreator<{ gameState: GameState }>('game-state/set'),
  statusSet: ActionCreator<{ status: Status }>('status/set'),
};
