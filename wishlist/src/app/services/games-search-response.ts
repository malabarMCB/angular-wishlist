import {Game} from '../game/game.model';

export interface GamesSearchResponse {
  totalCount: number;
  games: Game[];
}
