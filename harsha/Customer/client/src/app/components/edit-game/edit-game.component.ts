import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css'],
})
export class EditGameComponent implements OnInit {
  game: Game = {
    name: '',
    players: [],
  };
  extraPlayers: Player[] = [];
  addPlayerToList?: Player = {};
  removePlayerFromList?: Player = {};

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getGameById(this.route.snapshot.params.id);
    this.extraPlayers = [
      { id: 1, name: 'shiva' },
      { id: 2, name: 'adarsh' },
      { id: 3, name: 'shashi' },
      { id: 4, name: 'druthvik' },
      { id: 5, name: 'shubhankar' },
    ];
  }

  async getGameById(id: number) {
    this.game = await this.customerService.getGameById(id);
  }

  public onSelectPushExtraPlayerToPlayersList(player: Player) {
    this.removePlayerFromList = player;
    this.game.players?.push(this.removePlayerFromList!);
    this.extraPlayers.splice(
      this.extraPlayers.indexOf(this.removePlayerFromList!),
      1
    );
  }

  public onSelectPushPlayerToExtraPlayersList(player: Player) {
    this.addPlayerToList = player;
    this.extraPlayers.push(this.addPlayerToList!);
    this.game.players?.splice(
      this.game.players?.indexOf(this.addPlayerToList!),
      1
    );
  }

  async updateGame(): Promise<void> {
    const game = {
      id: this.game.id,
      name: this.game.name,
      players: this.game.players,
    };
    await this.customerService.updateGame(game);
  }
}
