import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Game} from '../../models/game';

@Component({
  selector: 'app-games-container-item',
  templateUrl: './games-container-item.component.html',
  styleUrls: ['./games-container-item.component.sass']
})
export class GamesContainerItemComponent {
  @Input() game: Game;
  @Input() isInCart: boolean;

  @Output() gameSelected = new EventEmitter<Game>();

  select(): boolean {
    this.gameSelected.emit(this.game);
    return false;
  }
}
