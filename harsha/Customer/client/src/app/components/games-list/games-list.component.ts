import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  games: Game[] = [];
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getGamesList();
  }

  async getGamesList(): Promise<void> {
    this.games = await this.customerService.getGamesList();
  }
}
