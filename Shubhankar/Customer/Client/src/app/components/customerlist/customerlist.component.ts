import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer';
import { Status, StatusFilter, UserService } from '../../services/user.service';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
})
export class CustomerlistComponent implements OnInit {
  removedCustomer: Customer = {};
  activeCustomer: Customer[] = [];
  customer: Customer = {
    name: '',
    status: '',
    address: '',
  };
  customers: Customer[] = [];
  status?: StatusFilter[] = [];
  public selectedStatus = new Status();
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.retrievecustomers();
    this.status = this.getStatusdata();
  }

  getStatusdata() {
    return this.userService.getfilterstatus();
  }

  async Deletecustomer(customer: Customer) {
    this.removedCustomer = customer;
    await this.userService.deleteCustomer(this.removedCustomer.id!);
  }

  async retrievecustomers(): Promise<void> {
    this.customers = await this.userService.getAll();
    this.activeCustomer = this.customers;
    console.log(this.customers);
  }
  click() {
    this.router.navigate(['/add']);
  }

  public onSelection(status: StatusFilter) {
    console.log(status.name);
    if (status.name == 'All') {
      this.activeCustomer = this.customers;
    } else {
      this.activeCustomer = this.customers.filter((input) => {
        return input.status === status.name;
      });
    }
  }
}
