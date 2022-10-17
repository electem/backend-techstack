import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerGroup } from 'src/app/models/customerGroup.model';
import { CustomerService } from 'src/app/services/customerservice';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-create-customer-group',
  templateUrl: './create-customer-group.component.html',
  styleUrls: ['./create-customer-group.component.css'],
})
export class CreateCustomerGroupComponent implements OnInit {
  createCustomerGroupForm!: FormGroup;
  currentCustomer!: Customer;
  customerGroups: CustomerGroup[] = [];
  customers!: Customer[];
  selectedCustomers: Customer[] = [];
  removeCurrentCustomer!: Customer;
  removeselectedCustomers: Customer[] = [];
  submitted = false;
  customerGroup: CustomerGroup = {
    groupname: '',
    description: '',
    customers: [],
  };

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCustomerGroupForm = this.formBuilder.group({
      groupname: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.retrieveCustomerGroups();
    this.retrieveCustomers();
  }
  async retrieveCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomer();
  }
  get formValidation() {
    return this.createCustomerGroupForm.controls;
  }
  async retrieveCustomerGroups(): Promise<void> {
    this.customerGroups = await this.customerService.getCustomerGroups();
  }
  async saveCustomerGroup(): Promise<void> {
    this.submitted = true;
    if (this.createCustomerGroupForm.invalid) {
      return;
    } else {
      this.saveCustomerGroupDetails();
    }
  }

  async saveCustomerGroupDetails(): Promise<void> {
    const customerData: CustomerGroup = {
      groupname: this.customerGroup.groupname,
      description: this.customerGroup.description,
    };
    await this.customerService.createCustomerGroup(customerData);
    this.router.navigate(['/customergroupList']);
  }
  setActiveCustomer(customer: Customer): void {
    this.currentCustomer = customer;
  }
  onSelectedCustomers() {
    this.selectedCustomers.push(this.currentCustomer);
    this.customers.splice(this.customers.indexOf(this.currentCustomer), 1);
  }
  removeActiveCustomer(customer: Customer): void {
    this.currentCustomer = customer;
  }
  onSelected() {
    this.customers.push(this.currentCustomer);
    this.selectedCustomers.splice(
      this.selectedCustomers.indexOf(this.currentCustomer),
      1
    );
  }
}
