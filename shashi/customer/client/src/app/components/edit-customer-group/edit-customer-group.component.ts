import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerGroup } from 'src/app/models/customerGroup.model';
import { CustomerService } from 'src/app/services/customerservice';
import { Customer } from 'src/app/models/customer.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-customer-group',
  templateUrl: './edit-customer-group.component.html',
  styleUrls: ['./edit-customer-group.component.css'],
})
export class EditCustomerGroupComponent implements OnInit {
  @Output() public customerEvent = new EventEmitter<Customer>();
  currentCustomer!: Customer;
  customerGroups: CustomerGroup[] = [];
  customers!: Customer[];
  selectedCustomers?: Customer[] = [];
  submitted = false;
  customerGroup: CustomerGroup = {
    groupname: '',
    description: '',
    customers: [],
  };
  currentcustomerEvent: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.retrieveCustomerGroups();
    this.retrieveCustomers();
    this.getCustomerGroupById(this.route.snapshot.params.id);
  }
  async getCustomerGroupById(id: number): Promise<void> {
    this.customerGroup = await this.customerService.getCustomerGroupById(id);
    this.selectedCustomers = this.customerGroup.customers;
  }

  async retrieveCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomers();
  }
  async retrieveCustomerGroups(): Promise<void> {
    this.customerGroups = await this.customerService.getCustomerGroups();
  }

  async setActiveCustomer(customer: Customer): Promise<void> {
    this.currentCustomer = customer;
    this.customerEvent.emit(customer);
  }

  async onSelectedCustomers(): Promise<void> {
    this.selectedCustomers?.push(this.currentCustomer);
    this.customers.splice(this.customers.indexOf(this.currentCustomer), 1);
    this.currentcustomerEvent.push(this.currentCustomer);
  }

  async removeActiveCustomer(customer: Customer): Promise<void> {
    this.currentCustomer = customer;
  }

  async onSelectedRemove(): Promise<void> {
    this.customers.push(this.currentCustomer);
    this.selectedCustomers?.splice(
      this.selectedCustomers.indexOf(this.currentCustomer),
      1
    );
  }
  async updateCustomerGroup(): Promise<void> {
    const customerGroup: CustomerGroup = {
      id: this.customerGroup.id,
      groupname: this.customerGroup.groupname,
      description: this.customerGroup.description,
      customers: this.selectedCustomers,
    };
    await this.customerService.updateCustomerGroup(customerGroup);
  }
}
