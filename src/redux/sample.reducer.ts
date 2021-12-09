import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { SampleAction } from './sample.action';

export type SampleStore = {
  num: number;
  str: string;
};

/**
 * Storeの値を更新
 */
export const SampleReducer = reducerWithInitialState<SampleStore>({
  num: 0,
  str: 'initial value !!',
})
  .case(SampleAction.numIncrement, (state, payload) => ({
    ...state,
    num: (state.num += 1),
  }))
  .case(SampleAction.numDecrement, (state, payload) => ({
    ...state,
    num: (state.num -= 1),
  }))
  .case(SampleAction.numSet, (state, payload) => ({
    ...state,
    num: payload,
  }))
  .case(SampleAction.strSet, (state, payload) => ({
    ...state,
    str: payload,
  }));
