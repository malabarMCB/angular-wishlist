import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as Actions from './app-store.actions';
import {Game} from '../models/game';

export interface GameState {
  searchValue: string;
  gamesInCart: Game[];
}

const initialState: GameState = {
  searchValue: '',
  gamesInCart: []
};

const reducer = createReducer(
  initialState,
  on(Actions.setSearchValue, (state, {searchValue}) => ({...state, searchValue})),
  on(Actions.addGameToCart, (state, {game}) => ({...state, gamesInCart: [...state.gamesInCart, game]})),
  on(Actions.removeGameFromCart, (state, {gameId}) => ({...state, gamesInCart: state.gamesInCart.filter(x => x.id !== gameId)})),
  on(Actions.clearGamesInCart, (state) => ({...state, gamesInCart: []}))
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

export const getGamesInCart =
  createSelector(
    getGamesState,
    state => state.gamesInCart
  );
