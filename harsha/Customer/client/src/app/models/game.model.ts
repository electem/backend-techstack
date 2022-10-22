import { Player } from './player.model';

export interface Game {
  id?: number;
  name?: string;
  players?: Player[];
}
