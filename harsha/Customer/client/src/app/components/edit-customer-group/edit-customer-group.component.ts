import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerGroup } from '../../models/customer-group.model';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-edit-customer-group',
  templateUrl: './edit-customer-group.component.html',
  styleUrls: ['./edit-customer-group.component.css'],
})
export class EditCustomerGroupComponent implements OnInit {
  customers: Customer[] = [];
  customerGroup: CustomerGroup = {
    name: '',
    description: '',
    customers: [],
  };
  updatedCustomers: Customer[] = [];
  addCustomerToList?: Customer = {};
  removeCustomerFromList?: Customer = {};

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCustomerGroupById(this.route.snapshot.params.id);
    this.getCustomers();
  }

  async getCustomerGroupById(id: number) {
    this.customerGroup = await this.customerService.getCustomerGroupById(id);
    this.updatedCustomers = this.customerGroup.customers!;
  }

  async getCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomers();
  }

  public onSelectingFromCustomersList(customer: Customer) {
    if (customer != null) {
      this.addCustomerToList = customer;
    }
  }

  public addCustomerToUpdateList() {
    this.updatedCustomers.push(this.addCustomerToList!);
    this.customers.splice(this.customers.indexOf(this.addCustomerToList!), 1);
  }

  public onSelectingFromUpdateCustomerList(customer: Customer) {
    if (customer != null) {
      this.removeCustomerFromList = customer;
    }
  }

  public removeCustomerFromUpdateList() {
    this.customers.push(this.removeCustomerFromList!);
    this.updatedCustomers.splice(
      this.updatedCustomers.indexOf(this.removeCustomerFromList!),
      1
    );
  }

  async updateCustomerGroup(): Promise<void> {
    const customerGroup = {
      id: this.customerGroup.id,
      name: this.customerGroup.name,
      description: this.customerGroup.description,
      customers: this.updatedCustomers,
    };
    await this.customerService.updateCustomerGroup(
      this.customerGroup.id!,
      customerGroup
    );
  }
}
