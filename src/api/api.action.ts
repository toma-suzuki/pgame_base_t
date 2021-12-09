import actionCreatorFactory, { Action } from 'typescript-fsa';
import { ApiBase } from './api-base';

type ParamOnError = (error: any) => {};
type ParamOnSuccess = (response: any) => {};
type ParamRun = {
  api: ApiBase<any>,
  onSuccess?: ParamOnSuccess,
  onError?: ParamOnError,
};

const ActionCreator = actionCreatorFactory('api');

export const ApiAction = {
  run: ActionCreator<ParamRun>('run'),
  onSuccess: ActionCreator<{ response: any, callback: ParamOnSuccess }>('on-success'),
  onError: ActionCreator<{ error: any, callback: ParamOnError }>('on-error'),
};
