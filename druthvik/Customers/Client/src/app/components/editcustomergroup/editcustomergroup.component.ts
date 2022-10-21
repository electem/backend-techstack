import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    descritption: '',
    customers: [],
  };
  customers: customerGroup[];
  currentCustomer: createCustomer;
  selectedCustomers: createCustomer[] = [];
  removeCustomer: createCustomer;
  constructor(
    private customerServicegroup: customergroupService,
    private route: ActivatedRoute,
    private customerService: customerService,
    private router: Router,
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
      descritption: this.customergroup.descritption,
      customers: this.selectedCustomers,
    };
    await this.customerServicegroup.updateGroup(customergroup);
  }

  async deleteGroupById() {
    await this.customerServicegroup.deletCustomerGroupById(
      this.customergroup.id,
    );
    this.router.navigate(['/customergroup']);
  }
}
