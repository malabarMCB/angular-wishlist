import {createAction, props} from '@ngrx/store';
import {Game} from './game.model';

export const setSearchValue = createAction(
  '[Game] Set search value',
  props<{searchValue: string}>()
);

/*export const setItemsPerPage = createAction(
  '[Game] Set items per page',
  props<{itemsPerPage: number}>()
);

export const setPageNumber = createAction(
  '[Game] Set page number',
  props<{pageNumber: number}>()
);

export const addToCart = createAction(
  '[Game] Add to cart',
  props<{games: Game}>()
);

export const removeFromCart = createAction(
  '[Game] Add to cart',
  props<{games: Game}>()
);*/
