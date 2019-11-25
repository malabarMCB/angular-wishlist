import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../models/game';
import {Store} from '@ngrx/store';
import {GameState, getGamesInCart} from '../../store/app-store.reducer';
import {clearGamesInCart, removeGameFromCart} from '../../store/app-store.actions';
import {Subscription} from 'rxjs';
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private getGamesInCartSubscription: Subscription;
  private cartModal: NgbModalRef;

  games: Game[];

  constructor(private readonly store: Store<GameState>, private readonly modalService: NgbModal) { }

  ngOnInit() {
    this.store.select(getGamesInCart).subscribe(games => {
      this.games = games;
      if (this.isCartEmpty() && this.cartModal) {
        this.cartModal.close();
      }
    });
  }

  isCartEmpty(): boolean {
    return this.games.length === 0;
  }

  onGameRemoved(gameId: string): void {
    this.store.dispatch(removeGameFromCart({gameId}));
  }

  openCart(content: any): boolean {
    this.cartModal = this.modalService.open(content, {scrollable: true});
    return false;
  }

  confirmPurchase(): boolean {
    const msg = 'You`ve bought: \n' + this.games.map(g => g.name).join('\n');
    this.store.dispatch(clearGamesInCart());
    alert(msg);
    return false;
  }

  ngOnDestroy(): void {
    this.getGamesInCartSubscription.unsubscribe();
  }
}
