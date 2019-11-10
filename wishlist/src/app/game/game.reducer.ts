import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as GameActions from './game.actions';

export interface GameState {
  searchValue: string;
}

const initialState: GameState = {
  searchValue: ''
};

const reducer = createReducer(
  initialState,
  on(GameActions.setSearchValue, (state, {searchValue}) => ({...state, searchValue}))
);

export function gameReducer(state: GameState | undefined, action: Action) {
  return reducer(state, action);
}

export const getGamesState = createFeatureSelector<GameState>('state');

export const getSearchValue =
  createSelector(
    getGamesState,
    state => state.searchValue
  );
