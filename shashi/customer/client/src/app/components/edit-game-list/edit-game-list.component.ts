import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { CustomerService } from 'src/app/services/customerservice';
import Playerjson from '../../services/game.json';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-edit-game-list',
  templateUrl: './edit-game-list.component.html',
  styleUrls: ['./edit-game-list.component.css'],
})
export class EditGameListComponent implements OnInit {
  gamesList = Playerjson;
  currentPlayer!: Player;
  removePlayer!: Game;
  players!: Player[];
  selectedplayers: Player[] = [];
  gameArray: Game[] = [];
  playerList: Player[] = [];
  game: Game = {
    name: '',
    players: [],
  };

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCustomerById(this.route.snapshot.params.id);
    this.getGamesPlayers();
    this.getPlayers();
  }
  async getCustomerById(id: number): Promise<void> {
    this.game = await this.customerService.getGameById(id);
    console.log(this.game);
  }
  async getGamesPlayers(): Promise<void> {
    this.gameArray = await this.customerService.getGamesPlayers();
    console.log(this.gameArray);
  }
  async getPlayers(): Promise<void> {
    this.playerList = await this.customerService.getPlayers();
  }
  async removeActivePlayer(player: Player): Promise<void> {
    this.currentPlayer = player;
    this.game.players?.push(this.currentPlayer);
    this.playerList.splice(this.playerList.indexOf(this.currentPlayer), 1);
  }
  async removeSelectedPlayerFromGame(player: Player): Promise<void> {
    this.removePlayer = player;
    this.playerList.push(this.removePlayer);
    this.game.players?.splice(this.game.players?.indexOf(this.removePlayer), 1);
  }

  async onSelectedRemove(): Promise<void> {
    this.players.push(this.currentPlayer);
    this.selectedplayers.splice(
      this.selectedplayers.indexOf(this.currentPlayer),
      1
    );
  }
  async updateGame(): Promise<void> {
    const games: Game = {
      id: this.game.id,
      name: this.game.name,
      players: this.game.players,
    };
    console.log(games);
  }
}
