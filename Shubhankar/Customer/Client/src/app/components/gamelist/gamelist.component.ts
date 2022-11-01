import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {
  games: Game[] = [];

  constructor(private userService: UserService,) { }

  ngOnInit(): void {
    this.retrieveGames();
  }

  async retrieveGames(){
    this.games = await this.userService.getAllgames();
  }

  
}
