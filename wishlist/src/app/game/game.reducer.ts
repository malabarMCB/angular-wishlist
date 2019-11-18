import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as GameActions from './game.actions';
import {Game} from './game.model';

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
  on(GameActions.setSearchValue, (state, {searchValue}) => ({...state, searchValue})),
  on(GameActions.addGameToCart, (state, {game}) => ({...state, gamesInCart: [...state.gamesInCart, game]})),
  on(GameActions.removeGameFromCart, (state, {gameId}) => ({...state, gamesInCart: state.gamesInCart.filter(x => x.id !== gameId)}))
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
