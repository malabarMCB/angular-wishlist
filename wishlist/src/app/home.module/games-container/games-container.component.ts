import { Component, OnInit } from '@angular/core';
import {GamesService} from '../../services/games.service.';
import {Store} from '@ngrx/store';
import {GameState, getSearchValue} from '../../game/game.reducer';
import {Game} from '../../game/game.model';

@Component({
  selector: 'app-games-container',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.sass']
})
export class GamesContainerComponent implements OnInit {
  games: Game[];
  itemsPerPage = 8;
  itemsTotalCount = 0;
  currentPage = 1;
  showPagesCount = 5;

  constructor(private gameService: GamesService, private store: Store<GameState>) { }

  ngOnInit() {
    this.store.select(getSearchValue).subscribe(searchValue => {
      this.gameService.search(1, 8, searchValue).subscribe(response => {
        this.itemsTotalCount = response.totalCount;
        this.games = response.games;
        this.currentPage = 1;
      });
    });
  }

  getTotalPageCount(): number {
    return Math.ceil(this.itemsTotalCount / this.itemsPerPage);
  }
}
