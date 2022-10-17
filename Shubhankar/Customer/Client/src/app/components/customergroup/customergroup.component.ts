import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customergroup } from 'src/app/models/customergroup';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-customergroup',
  templateUrl: './customergroup.component.html',
  styleUrls: ['./customergroup.component.css'],
})
export class CustomergroupComponent implements OnInit {
  currentIndex = -1;
  customergroup: Customergroup[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.retrievecustomergroup();
  }
  async retrievecustomergroup(): Promise<void> {
    this.customergroup = await this.userService.getcustomergroup();
    console.log(this.customergroup);
  }

  click() {
    this.router.navigate(['/addgroup']);
  }
}
