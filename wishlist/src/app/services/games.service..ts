import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Game} from '../models/game.model';
import {map} from 'rxjs/operators';

@Injectable()
export class GamesService {

  constructor(private http: HttpClient) { }

  search(): Observable<Game[]> {
    return this.http.get('assets/products.json')
      .pipe(map(games => {
        return Object.keys(games).map(key => {
          return new Game(key, games[key].name, games[key].price, games[key].cover);
        });
      }));
  }
}
