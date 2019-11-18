import {createAction, props} from '@ngrx/store';
import {Game} from './game.model';

export const setSearchValue = createAction(
  '[Game] Set search value',
  props<{searchValue: string}>()
);

export const addGameToCart = createAction(
  '[Game] Add info to cart',
  props<{game: Game}>()
);
