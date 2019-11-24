import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { GamesContainerComponent, GamesContainerComponentOptions } from './games-container/games-container.component';
import { PaginationComponent } from './pagination/pagination.component';
import {GamesService} from '../services/games.service.';
import {HttpClientModule} from '@angular/common/http';
import { GamesContainerItemComponent } from './games-container-item/games-container-item.component';
import { environment } from 'src/environments/environment';
import {FormsModule} from '@angular/forms';

const gamesContainerComponentOptions =
{gamesPerPage: environment.gamesPerPage, showPagesCount: environment.showPagesCount} as GamesContainerComponentOptions;

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    GamesContainerComponent,
    PaginationComponent,
    GamesContainerItemComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: GamesService, useClass: GamesService},
    {provide: GamesContainerComponentOptions, useValue: gamesContainerComponentOptions}
  ]
})
export class HomeModule { }
