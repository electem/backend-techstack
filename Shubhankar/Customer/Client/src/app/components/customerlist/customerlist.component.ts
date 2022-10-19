import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
})

export class CustomerlistComponent implements OnInit {

  removedCustomer: Customer = {};
  customer: Customer = {
    name: '',
    status: '',
    address: '',
  };
  customers: Customer[] = [];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.retrievecustomers();
  }

  async Deletecustomer(customer: Customer) {
    this.removedCustomer = customer;
    await this.userService.deleteCustomer(this.removedCustomer.id!);
  }

  async retrievecustomers(): Promise<void> {
    this.customers = await this.userService.getAll();
    console.log(this.customers);
  }
  click() {
    this.router.navigate(['/add']);
  }
}
