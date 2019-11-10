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

  constructor(private gameService: GamesService, private store: Store<GameState>) { }

  ngOnInit() {
    this.store.select(getSearchValue).subscribe(searchValue => {
      this.gameService.search(1, 8, searchValue).subscribe(games => this.games = games);
    });
  }

}
