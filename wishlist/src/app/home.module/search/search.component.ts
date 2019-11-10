import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {GameState, getSearchValue} from '../../game/game.reducer';
import {setSearchValue} from '../../game/game.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  constructor(private store: Store<GameState>) { }

  ngOnInit() {

  }

  search(searchValue: string): boolean {
    console.log(`input value is ${searchValue}`);
    this.store.dispatch(setSearchValue({searchValue}));
    return false;
  }
}
