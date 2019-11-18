import { Component, OnInit } from '@angular/core';
import {Game} from '../../game/game.model';
import {Store} from '@ngrx/store';
import {GameState, getGamesInCart} from '../../game/game.reducer';

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

}
