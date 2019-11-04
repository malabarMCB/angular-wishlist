import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { GamesContainerComponent } from './games-container/games-container.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    GamesContainerComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
