import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Game} from '../models/game.model';
import {map} from 'rxjs/operators';

@Injectable()
export class GamesService {

  constructor(private http: HttpClient) { }

  search(pageNumber: number, itemsPerPage: number, text?: string): Observable<Game[]> {
    return this.http.get('assets/products.json')
      .pipe(map(games => {
        return Object.keys(games).map(key => {
          return new Game(key, games[key].name, games[key].price, games[key].cover);
        });
      }),
        map((games: Game[]) => (text)
          ? games.filter(x => x.name.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()))
        : games),
        map((games: Game[]) => games.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage))
        );
  }
}
