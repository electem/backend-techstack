import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { CustomerService } from 'src/app/services/customerservice';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {
  gameList: Game[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getGames();
  }
  async getGames(): Promise<void> {
    this.gameList = await this.customerService.getGames();
  }
}
