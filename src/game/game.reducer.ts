import * as lodash from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { GameAction } from './game.action';

export type Status = 'ready' | 'pause' | 'running';

export type GameState = {
  score: number;
};

/**
 * データを保管するクラス
 */
export type GameStore = {
  sceneName: string,
  gameState: GameState,
  version: string,
  buildNo: number
  type: 'pc' | 'sp',
  mode: 'local' | 'dev' | 'prod',
  status: Status,
};

/**
 * Storeの値を更新
 */
export const GameReducer = reducerWithInitialState<GameStore>({
  sceneName: '',
  gameState: {
    score: 0,
  },
  version: '',
  buildNo: 0,
  type: 'pc',
  mode: 'local',
  status: 'ready',
})
  .case(GameAction.sceneNameSet, (state, payload) => ({
    ...state,
    sceneName: payload.sceneName,
  }))
  .case(GameAction.envSet, (state, payload) => ({
    ...state,
    version: payload.version,
    buildNo: payload.buildNo,
    mode: payload.mode,
  }))
  .case(GameAction.typeSet, (state, payload) => ({
    ...state,
    type: payload.type,
  }))
  .case(GameAction.gameStateSet, (state, payload) => ({
    ...state,
    gameState: lodash.cloneDeep(payload.gameState),
  }))
  .case(GameAction.statusSet, (state, payload) => ({
    ...state,
    status: payload.status,
  }))
;
