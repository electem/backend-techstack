import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/player-employee.service';

@Component({
  selector: 'app-gameplayer',
  templateUrl: './gameplayer.component.html',
  styleUrls: ['./gameplayer.component.css'],
})
export class GameplayerComponent implements OnInit {
  game: Game[];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.game = this.gameService.getGames();
    console.log(this.game);
  }
}
