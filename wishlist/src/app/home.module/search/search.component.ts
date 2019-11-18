import { Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {GameState} from '../../game/game.reducer';
import {setSearchValue} from '../../game/game.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {

  constructor(private store: Store<GameState>) { }

  search(searchValue: string): boolean {
    this.store.dispatch(setSearchValue({searchValue}));
    return false;
  }
}
