import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService, Status } from 'src/app/services/customerservice';

@Component({
  selector: 'app-customer',
  templateUrl: './customerList.component.html',
  styleUrls: ['./customerList.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  status: Status[] = [];
  statusactive?: Status[];
  statusInactive: Status[] = [];
  allCustomers: Customer[] = [];
  selectedTeam?: string;
  public selectedStatus = new Status();
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.retrieveCustomers();
    this.getStatus();
  }
  getStatus() {
    this.status = this.customerService.getStatus();
  }
  async retrieveCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomers();
    this.allCustomers = this.customers;
  }

  onSelected(value: Status): void {
    if (value.name === 'All List') {
      this.customers = this.allCustomers;
    } else {
      this.selectedTeam = value.name;
      this.customers = this.allCustomers.filter((object) => {
        return object.status === value.name;
      });
    }
  }
}
