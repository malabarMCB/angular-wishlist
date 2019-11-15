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

/*
  take from config
*/
  gamesPerPage = 8;
  gamesTotalCount = 0;
  showPagesCount = 5;

  currentPage = 1;

  searchValue: string;

  constructor(private gameService: GamesService, private store: Store<GameState>) { }

  ngOnInit() {
    this.store.select(getSearchValue).subscribe(searchValue => {
      this.searchValue = searchValue;
      this.currentPage = 1;
      this.getGames();
    });
  }

  getTotalPageCount(): number {
    return Math.ceil(this.gamesTotalCount / this.gamesPerPage);
  }

  onPageClicked(page: number) {
    this.currentPage = page;
    this.getGames();
  }

  private getGames(): void {
    this.gameService.search(this.currentPage, this.gamesPerPage, this.searchValue).subscribe(response => {
      this.gamesTotalCount = response.totalCount;
      this.games = response.games;
    });
  }
}
