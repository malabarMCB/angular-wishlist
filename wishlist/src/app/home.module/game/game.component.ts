import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Game} from '../../game/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent {
  @Input() game: Game;
  @Input() isInCart: boolean;

  @Output() gameSelected = new EventEmitter<Game>();

  select(): boolean {
    this.gameSelected.emit(this.game);
    return false;
  }
}
