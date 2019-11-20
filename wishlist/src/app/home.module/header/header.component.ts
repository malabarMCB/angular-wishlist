import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../game/game.model';
import {Store} from '@ngrx/store';
import {GameState, getGamesInCart} from '../../game/game.reducer';
import {removeGameFromCart} from '../../game/game.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  games: Game[];

  private getGamesInCartSubscription: Subscription;

  constructor(private store: Store<GameState>) { }

  ngOnInit() {
    this.store.select(getGamesInCart).subscribe(games => this.games = games);
  }

  isCartEmpty(): boolean {
    return this.games.length === 0;
  }

  removeGameFromCart(gameId: string): boolean {
    this.store.dispatch(removeGameFromCart({gameId}));
    return false;
  }

  ngOnDestroy(): void {
    this.getGamesInCartSubscription.unsubscribe();
  }
}
