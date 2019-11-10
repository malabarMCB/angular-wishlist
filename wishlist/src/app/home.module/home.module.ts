import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { GamesContainerComponent } from './games-container/games-container.component';
import { PaginationComponent } from './pagination/pagination.component';
import {GamesService} from '../services/games.service.';
import {HttpClientModule} from '@angular/common/http';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    GamesContainerComponent,
    PaginationComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  providers: [
    {provide: GamesService, useClass: GamesService}
  ]
})
export class HomeModule { }
