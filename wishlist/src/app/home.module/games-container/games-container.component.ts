import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamesService} from '../../services/games.service.';
import {Store} from '@ngrx/store';
import {GameState, getGamesInCart, getSearchValue} from '../../game/game.reducer';
import {Game} from '../../game/game.model';
import {addGameToCart} from '../../game/game.actions';
import {forkJoin, Subscription} from 'rxjs';
import {first, map, mergeMap, skip} from 'rxjs/operators';

@Component({
  selector: 'app-games-container',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.sass']
})
export class GamesContainerComponent implements OnInit, OnDestroy {
  games: {info: Game, isInCart: boolean}[] = [];

/*
  take from config
*/
  readonly gamesPerPage = 8;
  gamesTotalCount = 0;
  readonly showPagesCount = 5;

  currentPage = 1;

  searchValue: string;

  private getSearchValueSubscription: Subscription;
  private getGamesInCartSubscription: Subscription;

  constructor(private readonly gameService: GamesService, private readonly store: Store<GameState>) { }

  ngOnInit() {
    this.getSearchValueSubscription = this.store.select(getSearchValue).pipe(
      mergeMap(searchValue => forkJoin(
        this.gameService.search(this.currentPage, this.gamesPerPage, searchValue).pipe(map(response => {
          return {response, searchValue};
        })),
        this.store.select(getGamesInCart).pipe(first())
      ))
    ).subscribe(([searchResponse, gamesInCart]) => {
      this.gamesTotalCount = searchResponse.response.totalCount;
      this.searchValue = searchResponse.searchValue;
      this.setGames(searchResponse.response.games, gamesInCart);
    });

    this.getGamesInCartSubscription = this.store.select(getGamesInCart).pipe(skip(1))
      .subscribe((gamesInCart: Game[]) => {
        this.setGames(this.games.map(game => game.info), gamesInCart);
      });
  }

  getTotalPageCount(): number {
    return Math.ceil(this.gamesTotalCount / this.gamesPerPage);
  }

  onPageClicked(page: number) {
    this.currentPage = page;

    forkJoin(this.gameService.search(this.currentPage, this.gamesPerPage, this.searchValue),
      this.store.select(getGamesInCart).pipe(first())
    ).pipe(first()).subscribe(([searchResponse, gamesInCart]) => {
      this.gamesTotalCount = searchResponse.totalCount;
      this.setGames(searchResponse.games, gamesInCart);
    });
  }

  onGameSelected(game: Game) {
    this.store.dispatch(addGameToCart({game}));
  }

  private setGames(games: Game[], gamesInCart: Game[]): void {
    this.games = games.map(game => {
      return { info: game, isInCart : !!gamesInCart.find(g => g.id === game.id)};
    });
  }

  ngOnDestroy(): void {
    this.getSearchValueSubscription.unsubscribe();
    this.getGamesInCartSubscription.unsubscribe();
  }
}
