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
  removedCustomer: Customergroup = {};

  groupcustomer: Customergroup = {
    name: '',
    description: '',
    customers: [],
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.retrievecustomergroup();
  }
  async retrievecustomergroup(): Promise<void> {
    this.customergroup = await this.userService.getcustomergroup();
    console.log(this.customergroup);
  }

  async Deletecustomergroup(customer: Customergroup) {
    this.removedCustomer = customer;
    await this.userService.deleteCustomergroup(this.removedCustomer.id!);
  }

  click() {
    this.router.navigate(['/addgroup']);
  }
}
