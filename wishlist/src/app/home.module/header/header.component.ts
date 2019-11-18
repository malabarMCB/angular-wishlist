import { Component, OnInit } from '@angular/core';
import {Game} from '../../game/game.model';
import {Store} from '@ngrx/store';
import {GameState, getGamesInCart} from '../../game/game.reducer';
import {removeGameFromCart} from '../../game/game.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  games: Game[];

  constructor(private store: Store<GameState>) { }

  ngOnInit() {
    this.store.select(getGamesInCart).subscribe(games => this.games = games);
  }

  removeGameFromCart(gameId: string): boolean {
    this.store.dispatch(removeGameFromCart({gameId}));
    return false;
  }
}
