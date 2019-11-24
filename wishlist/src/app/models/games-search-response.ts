import {Game} from './game';

export interface GamesSearchResponse {
  totalCount: number;
  games: Game[];
}
