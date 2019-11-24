import {createAction, props} from '@ngrx/store';
import {Game} from '../models/game';

export const setSearchValue = createAction(
  '[Game] Set search value',
  props<{searchValue: string}>()
);

export const addGameToCart = createAction(
  '[Game] Add info to cart',
  props<{game: Game}>()
);

export const removeGameFromCart = createAction(
  '[Game] Remove models from cart',
  props<{gameId: string}>()
);
