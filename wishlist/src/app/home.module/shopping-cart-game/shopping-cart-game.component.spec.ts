import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartGameComponent } from './shopping-cart-game.component';

describe('ShoppingCartGameComponent', () => {
  let component: ShoppingCartGameComponent;
  let fixture: ComponentFixture<ShoppingCartGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
