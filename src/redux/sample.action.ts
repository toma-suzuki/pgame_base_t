import actionCreatorFactory from 'typescript-fsa';

const ActionCreator = actionCreatorFactory('sample');

export const SampleAction = {
  numIncrement: ActionCreator('num/increment'),
  numDecrement: ActionCreator('num/decrement'),
  numSet: ActionCreator<number>('num/set'),
  strSet: ActionCreator<string>('str/set'),
};
