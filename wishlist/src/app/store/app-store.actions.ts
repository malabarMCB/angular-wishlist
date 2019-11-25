import {createAction, props} from '@ngrx/store';
import {Game} from '../models/game';

export const setSearchValue = createAction(
  '[App] Set search value',
  props<{searchValue: string}>()
);

export const addGameToCart = createAction(
  '[App] Add info to cart',
  props<{game: Game}>()
);

export const removeGameFromCart = createAction(
  '[App] Remove games from cart',
  props<{gameId: string}>()
);

export const clearGamesInCart = createAction(
  '[App] Clear games in cart'
);
