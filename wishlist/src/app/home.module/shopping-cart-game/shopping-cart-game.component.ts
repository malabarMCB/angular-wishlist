import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Game} from '../../models/game';

@Component({
  selector: 'app-shopping-cart-game',
  templateUrl: './shopping-cart-game.component.html',
  styleUrls: ['./shopping-cart-game.component.sass']
})
export class ShoppingCartGameComponent {
  @Input() game: Game;
  @Output() gameRemoved = new EventEmitter<string>();

  constructor() { }

  remove(): boolean {
    this.gameRemoved.emit(this.game.id);
    return false;
  }
}
