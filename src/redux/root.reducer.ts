import { combineReducers } from 'redux';
import { SampleReducer, SampleStore } from './sample.reducer';
import { GameReducer, GameStore } from '../game/game.reducer';

export type IStore = {
  sample: SampleStore;
  game: GameStore;
};

/**
 * 全てのreducerを実行
 * @returns {sample, game}
 */
export const RootReducer = () =>
  combineReducers<IStore>({
    sample: SampleReducer,
    game: GameReducer,
  });
