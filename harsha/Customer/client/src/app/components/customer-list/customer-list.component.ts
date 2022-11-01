import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService, Status } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  status?: Status[];
  customer: Customer = {};
  statu = new Status();
  selectedCustomers: Customer[] = [];
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
    this.getStatus();
  }

  async getCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomers();
    this.selectedCustomers = this.customers;
  }

  async getStatus(): Promise<void> {
    this.status = await this.customerService.getStatus();
  }

  onSelected(value: Status) {
    if (value.name == 'All') {
      this.selectedCustomers = this.customers;
    } else {
      this.selectedCustomers = this.customers.filter((input) => {
        return input.status === value.name;
      });
    }
  }
}
