import { call, put, takeEvery } from 'redux-saga/effects';
import { ApiAction } from './api.action';
import { Connection } from './connection';

/**
 * APIを動作させる処理
 * @param action
 */
function* tryRun(action: ReturnType<typeof ApiAction.run>) {
  const { api, onSuccess, onError } = action.payload;
  try {
    const response = yield Connection.run(api);
    const callback = (res: any) => (onSuccess ? onSuccess(res) : () => {});
    yield put(ApiAction.onSuccess({ response, callback }));
  } catch (error) {
    const callback = (err: any) =>
      onError
        ? onError(err)
        : () => {
            console.error(err);
          };
    yield put(ApiAction.onError({ error, callback }));
  }
}

/**
 * API処理が成功した場合の処理
 * @param action
 */
function* tryOnSuccess(action: ReturnType<typeof ApiAction.onSuccess>) {
  const { response, callback } = action.payload;
  callback(response);
}

/**
 * API処理がエラーになった場合の処理
 * @param action
 */
function* tryOnError(action: ReturnType<typeof ApiAction.onError>) {
  const { error, callback } = action.payload;
  callback(error);
}

export function* ApiSaga() {
  yield takeEvery(ApiAction.run, tryRun);
  yield takeEvery(ApiAction.onSuccess, tryOnSuccess);
  yield takeEvery(ApiAction.onError, tryOnError);
}
