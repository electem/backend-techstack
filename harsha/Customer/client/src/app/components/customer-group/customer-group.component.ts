import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerGroup } from 'src/app/models/customer-group.model';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html',
  styleUrls: ['./customer-group.component.css'],
})
export class CustomerGroupComponent implements OnInit {
  submitted: boolean = false;
  registerForm!: FormGroup;
  customers: Customer[] = [];
  newlyAddedCustomers: Customer[] = [];
  addCustomerToList?: Customer = {};
  removeCustomerFromList?: Customer = {};
  currentCustomerGroup: CustomerGroup = {
    name: '',
    description: '',
    customers: [],
  };

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.getCustomers();
  }

  get validation() {
    return this.registerForm.controls;
  }

  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
    this.saveCustomerGroup();
  }

  async saveCustomerGroup(): Promise<void> {
    const customerGroup: CustomerGroup = {
      name: this.currentCustomerGroup.name,
      description: this.currentCustomerGroup.description,
      customers: this.newlyAddedCustomers,
    };
    await this.customerService.createCustomerGroup(customerGroup);
    this.router.navigate(['/customer-group-list']);
  }

  async getCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomers();
  }

  public onSelectingFromCustomersList(customer: Customer) {
    if (customer != null) {
      this.addCustomerToList = customer;
    }
  }

  public addCustomerToNewList() {
    this.newlyAddedCustomers.push(this.addCustomerToList!);
    this.customers.splice(this.customers.indexOf(this.addCustomerToList!), 1);
  }

  public onSelectingFromNewCustomerList(customer: Customer) {
    if (customer != null) {
      this.removeCustomerFromList = customer;
    }
  }

  public removeCustomerFromNewList() {
    this.customers.push(this.removeCustomerFromList!);
    this.newlyAddedCustomers.splice(
      this.newlyAddedCustomers.indexOf(this.removeCustomerFromList!),
      1
    );
  }
}
