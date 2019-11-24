import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Game} from '../models/game';
import {map} from 'rxjs/operators';
import {GamesSearchResponse} from '../models/games-search-response';

@Injectable()
export class GamesService {

  constructor(private http: HttpClient) { }

  search(pageNumber: number, itemsPerPage: number, text?: string): Observable<GamesSearchResponse> {
    return this.http.get('assets/products.json')
      .pipe(map(games => {
          return Object.keys(games).map(key => {
            return { id: key, name: games[key].name, price: games[key].price, coverUrl: games[key].cover} as Game; });
        }),
        map((games: Game[]) => (text)
          ? games.filter(x => x.name.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()))
          : games),
        map((games: Game[]) => {
          return {totalCount: games.length, games};
        }),
        map((response: GamesSearchResponse) => {
          response.games = response.games.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
          return response;
        })
      );
  }
}
