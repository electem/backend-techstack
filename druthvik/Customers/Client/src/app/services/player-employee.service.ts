import gameplayer from '../services/game-players.json';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameplayer = gameplayer;

  constructor(private http: HttpClient) {}

  getGames() {
    return this.gameplayer;
  }
}
