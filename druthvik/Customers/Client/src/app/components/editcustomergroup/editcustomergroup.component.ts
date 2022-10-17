import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createCustomer } from 'src/app/models/customer.model';
import { customergroupService } from 'src/app/services/customergroup.service';
import { customerGroup } from '../../models/customergroup.model';
import { customerService } from '../../services/createcustomer.service';
@Component({
  selector: 'app-editcustomergroup',
  templateUrl: './editcustomergroup.component.html',
  styleUrls: ['./editcustomergroup.component.css'],
})
export class EditcustomergroupComponent implements OnInit {
  customergroup: customerGroup = {
    name: '',
    description: null,
    customers: [],
  };
  customers: customerGroup[];
  currentCustomer: createCustomer = {
    customergroup: [],
  };
  selectedCustomers: createCustomer[] = [];
  removeCustomer: createCustomer = {
    customergroup: [],
  };
  constructor(
    private customerServicegroup: customergroupService,
    private route: ActivatedRoute,
    private customerService: customerService,
  ) {}

  ngOnInit(): void {
    this.getCustomerGroupById(this.route.snapshot.params.id);
    this.retrieveCustomers();
  }
  async getCustomerGroupById(id: number) {
    this.customergroup = await this.customerServicegroup.getCustomerGroupById(
      id,
    );
    this.selectedCustomers = this.customergroup.customers;
  }
  setActiveCustomer(customerGroup): void {
    this.currentCustomer = customerGroup;
  }
  async onSelectCustomer() {
    if (this.currentCustomer != null) {
      this.selectedCustomers.push(this.currentCustomer);
    }
    this.customers = this.customers.filter(
      (customer) => customer.id != this.currentCustomer.id,
    );
  }

  setActiveRemoveCustomer(customerGroup): void {
    this.removeCustomer = customerGroup;
  }

  async removeCustomerFromList() {
    if (this.removeCustomer != null) {
      this.customers.push(this.removeCustomer);
    }
    this.selectedCustomers.splice(
      this.selectedCustomers.indexOf(this.removeCustomer!),

      1,
    );
  }
  async retrieveCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomer();
  }

  async updateCustomerGroup(): Promise<void> {
    const customergroup: customerGroup = {
      id: this.customergroup.id,
      name: this.customergroup.name,
      description: this.customergroup.description,
      customers: this.selectedCustomers,
    };
    await this.customerServicegroup.updateGroup(customergroup);
  }
}
