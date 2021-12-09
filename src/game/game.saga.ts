import { call, put, takeEvery } from 'redux-saga/effects';
import { GameAction } from './game.action';
import { GameController } from './game-controller';

/**
 * 環境の取得
 * @param action
 */
function* tryEnvGet(action: ReturnType<typeof GameAction.envGet>) {
  const getEnvJson = () => fetch('./jsgame/env.json').then((res) => res.json());
  const env = yield call(getEnvJson);
  const param = {
    version: env['version'],
    buildNo: env['build-no'],
    mode: env['mode'],
  };
  yield put(GameAction.envSet(param));
  action.payload.callback(param);
}

/**
 * Sceneの変更
 * @param action
 */
function* trySceneChange(action: ReturnType<typeof GameAction.sceneChange>) {
  const newSceneName = GameController.changeScene(action.payload.sceneName);
  put(GameAction.sceneNameSet({ sceneName: newSceneName }));
}

/**
 * 非同期を同期的に動作
 * @param action
 */
function* trySync(action: ReturnType<typeof GameAction.sync>) {
  yield put(action.payload.action);
  action.payload.callback();
}

export function* GameSaga() {
  yield takeEvery(GameAction.sceneChange, trySceneChange);
  yield takeEvery(GameAction.sync, trySync);
  yield takeEvery(GameAction.envGet, tryEnvGet);
}
