import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-editgame',
  templateUrl: './editgame.component.html',
  styleUrls: ['./editgame.component.css'],
})
export class EditgameComponent implements OnInit {
  submitted = false;
  removePlayer!: Game;
  players?: Player[];
  playerList: Player[] = [];
  editgame!: FormGroup;
  game: Game = {
    name: '',
    players: [],
  };
  extraPlayers: Player[] = [];
  addPlayerToList?: Player = {};
  removePlayerFromList?: Player = {};
  constructor(
    private userservice: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getGameById(this.route.snapshot.params.id);
    this.playerList = [
        { id: 1, name: 'ram' },
        { id: 2, name: 'anik' },
        { id: 3, name: 'shashi' },
        { id: 4, name: 'druki' },
        { id: 5, name: 'mannu' },
      ];
  }

  async getGameById(id: number) {
    this.game = await this.userservice.getGameById(id);
    console.log(this.game);
  }

  public onSelectPushExtraPlayerToPlayersList(player: Player) {
    this.removePlayerFromList = player;
    this.game.players?.push();
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

  get fval() {
    return this.editgame.controls;
  }
  async signup() {
    this.submitted = true;
    if (this.editgame.invalid) {
      return;
    }
  }

  async updateGame(): Promise<void> {
    const game = {
      id: this.game.id,
      name: this.game.name,
      players: this.game.players,
    };
    await this.userservice.updateGame(game);
  }
}

