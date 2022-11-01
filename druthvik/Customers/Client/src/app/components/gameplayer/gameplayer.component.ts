import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/player-employee.service';

@Component({
  selector: 'app-gameplayer',
  templateUrl: './gameplayer.component.html',
  styleUrls: ['./gameplayer.component.css'],
})
export class GameplayerComponent implements OnInit {
  game: Game[];

  games: Game = {
    Name: '',
    players: [],
  };
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.game = this.gameService.getGames();
    console.log(this.game);
  }
}
