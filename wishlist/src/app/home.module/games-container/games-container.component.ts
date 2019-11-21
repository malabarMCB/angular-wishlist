import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamesService} from '../../services/games.service.';
import {Store} from '@ngrx/store';
import {GameState, getGamesInCart, getSearchValue, getGamesState} from '../../game/game.reducer';
import {Game} from '../../game/game.model';
import {addGameToCart} from '../../game/game.actions';
import {forkJoin, Subscription} from 'rxjs';
import {first, map, mergeMap, skip} from 'rxjs/operators';
import {GamesSearchResponse} from '../../services/games-search-response';

export class GamesContainerComponentOptions {
  gamesPerPage: number;
  showPagesCount: number;
}

@Component({
  selector: 'app-games-container',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.sass']
})
export class GamesContainerComponent implements OnInit, OnDestroy {
  private readonly gamesPerPage: number;
  readonly showPagesCount: number;

  private getSearchValueSubscription: Subscription;
  private getGamesInCartSubscription: Subscription;

  games: {info: Game, isInCart: boolean}[] = [];
  gamesTotalCount = 0;
  currentPage = 1;

  constructor(private readonly gameService: GamesService,
              private readonly store: Store<GameState>,
              options: GamesContainerComponentOptions) {
    this.gamesPerPage = options.gamesPerPage;
    this.showPagesCount = options.showPagesCount;
  }

  ngOnInit() {
    this.getSearchValueSubscription = this.store.select(getSearchValue).pipe(
      mergeMap(searchValue => forkJoin(
        this.gameService.search(this.currentPage, this.gamesPerPage, searchValue),
        this.store.select(getGamesInCart).pipe(first())
      ))
    ).subscribe(([searchResponse, gamesInCart]) => {
      this.gamesTotalCount = searchResponse.totalCount;
      this.setGames(searchResponse.games, gamesInCart);
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

    this.store.select(getGamesState).pipe(first(),
      mergeMap(state =>
        this.gameService.search(this.currentPage, this.gamesPerPage, state.searchValue).pipe(
          map(response => [response, state.gamesInCart])))
    ).subscribe(([searchResponse, gamesInCart]: [GamesSearchResponse, Game[]]) => {
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
