import { Component, OnInit } from '@angular/core';
import {GamesService} from '../../services/games.service.';
import {Store} from '@ngrx/store';
import {GameState, getGamesInCart, getSearchValue} from '../../game/game.reducer';
import {Game} from '../../game/game.model';
import {addGameToCart} from '../../game/game.actions';
import {forkJoin} from 'rxjs';
import {first, map, mergeMap, skip} from 'rxjs/operators';

@Component({
  selector: 'app-games-container',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.sass']
})
export class GamesContainerComponent implements OnInit {
  games: {info: Game, isInCart: boolean}[] = [];

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
    this.store.select(getSearchValue).pipe(
      mergeMap(searchValue => forkJoin(
        this.gameService.search(this.currentPage, this.gamesPerPage, searchValue).pipe(map(response => {
          return {response, searchValue};
        })),
        this.store.select(getGamesInCart).pipe(first())
      ))
    ).subscribe(x => {
      this.gamesTotalCount = x[0].response.totalCount;
      this.searchValue = x[0].searchValue;
      this.games = x[0].response.games.map(game => {
        return { info: game, isInCart : !!x[1].find(g => g.id === game.id)};
      });
    });

    this.store.select(getGamesInCart).pipe(skip(1))
      .subscribe((gamesInCart: Game[]) => {
        this.games = this.games.map(game => {
          return { info: game.info, isInCart : !!gamesInCart.find(g => g.id === game.info.id)};
        });
      });
  }

  getTotalPageCount(): number {
    return Math.ceil(this.gamesTotalCount / this.gamesPerPage);
  }

  onPageClicked(page: number) {
    this.currentPage = page;

    forkJoin(this.gameService.search(this.currentPage, this.gamesPerPage, this.searchValue),
      this.store.select(getGamesInCart).pipe(first())
    ).toPromise().then(x => {
      this.gamesTotalCount = x[0].totalCount;
      this.games = x[0].games.map(game => {
        return { info: game, isInCart : !!x[1].find(g => g.id === game.id)};
      });
    });
  }

  onGameSelected(game: Game) {
    this.store.dispatch(addGameToCart({game}));
  }
}
