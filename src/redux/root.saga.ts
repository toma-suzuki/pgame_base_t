import { all, fork } from 'redux-saga/effects';
import { GameSaga } from '../game/game.saga';
import { ApiSaga } from '../api/api.saga';

export const RootSaga = function* () {
  yield all([
    fork(GameSaga),
    fork(ApiSaga),
  ]);
};
