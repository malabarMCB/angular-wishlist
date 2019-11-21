import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from '../../game/game.reducer';
import { setSearchValue } from '../../game/game.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  private searchValue: string;

  constructor(private store: Store<GameState>, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => this.searchValue = params['search'] || '');
  }

  ngOnInit() {
    this.setSearchValue();
  }

  search(searchValue: string): boolean {
    const homePagePath = '';
    const navigationPromise = searchValue
      ? this.router.navigate([homePagePath], { queryParams: { search: searchValue } })
      : this.router.navigate([homePagePath]);

    navigationPromise.then(_ => this.setSearchValue());
    return false;
  }

  private setSearchValue(): void {
    this.store.dispatch(setSearchValue({ searchValue: this.searchValue }));
  }
}
