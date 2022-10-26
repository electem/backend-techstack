import gameplayer from '../services/game-players.json';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Players {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private players: Players[] = [
    { id: 1, name: 'virat' },
    { id: 2, name: 'rohit' },
    { id: 3, name: 'bumrah' },
  ];
  gameplayer = gameplayer;

  constructor(private http: HttpClient) {}

  getPlayers() {
    return this.players;
  }

  getbyIds(id: number) {
    return this.gameplayer.find((item) => item.id == id);
  }

  getGamePLayers() {
    return this.gameplayer.map((obj) => {
      return obj.players.filter((value) => {
        return value;
      });
    });
  }

  getGames() {
    return this.gameplayer;
  }
}
