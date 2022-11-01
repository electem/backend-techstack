import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerGroup } from 'src/app/models/customerGroup.model';
import { CustomerService } from 'src/app/services/customerservice';
import { Customer } from 'src/app/models/customer.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-output-customer-group',
  templateUrl: './output-customer-group.component.html',
  styleUrls: ['./output-customer-group.component.css'],
})
export class OutputCustomerGroupComponent implements OnInit {
  currentCustomer!: Customer;
  customerGroups: CustomerGroup[] = [];
  customers!: Customer[];
  selectedCustomers: Customer[] = [];
  submitted = false;
  customerGroup: CustomerGroup = {
    groupname: '',
    description: '',
    customers: [],
  };
  currentcustomerEvent: Customer[] = [];

  constructor() {}

  ngOnInit(): void {}
  async setActiveCustomer(customer: Customer): Promise<void> {
    this.currentcustomerEvent.push(customer);
  }
}
