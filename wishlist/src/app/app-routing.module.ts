import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeModule} from './home.module/home.module';
import {HomeComponent} from './home.module/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, HomeModule]
})
export class AppRoutingModule { }
