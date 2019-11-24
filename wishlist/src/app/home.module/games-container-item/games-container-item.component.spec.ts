import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesContainerItemComponent } from './games-container-item.component';

describe('GamesContainerItemComponent', () => {
  let component: GamesContainerItemComponent;
  let fixture: ComponentFixture<GamesContainerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesContainerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesContainerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
