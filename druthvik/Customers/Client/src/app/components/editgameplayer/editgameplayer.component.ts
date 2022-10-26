import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { GameService } from 'src/app/services/player-employee.service';
import { Players } from '../../services/player-employee.service';

@Component({
  selector: 'app-editgameplayer',
  templateUrl: './editgameplayer.component.html',
  styleUrls: ['./editgameplayer.component.css'],
})
export class EditgameplayerComponent implements OnInit {
  games: Game = {
    Name: '',
    players: [],
  };
  gamePlayer: any;
  players: Players[];
  selectedPlayers: Players[] = [];
  player: Players[] = [];
  playerss = new Players();
  removePlayer!: Game;
  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getbyId(this.route.snapshot.params.id);
    this.players = this.getPlayers();
    this.getGamePlayers();
  }

  getbyId(id: number) {
    this.games = this.gameService.getbyIds(id);
  }
  getGamePlayers() {
    this.gamePlayer = this.gameService.getGamePLayers();
    console.log(this.gamePlayer);
  }
  getPlayers() {
    return this.gameService.getPlayers();
  }

  onSelected(value: Players, isChecked: boolean) {
    if (isChecked) {
      this.selectedPlayers.push(value);
    }
  }
  async updateGame(): Promise<void> {
    const games: Game = {
      id: this.games.id,
      Name: this.games.Name,
      players: this.games.players,
    };
    console.log(games);
  }
  async removeSelectedPlayerFromGame(player: Player): Promise<void> {
    this.removePlayer = player;
    this.player.push(this.removePlayer);
    this.game.players?.splice(this.game.players?.indexOf(this.removePlayer), 1);
  }
}
