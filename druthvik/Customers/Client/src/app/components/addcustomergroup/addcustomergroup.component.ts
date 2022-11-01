import { Component, OnInit } from '@angular/core';
import { customergroupService } from 'src/app/services/customergroup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customerGroup } from '../../models/customergroup.model';
import { customerService } from '../../services/createcustomer.service';
import { createCustomer } from '../../models/customer.model';

@Component({
  selector: 'app-addcustomergroup',
  templateUrl: './addcustomergroup.component.html',
  styleUrls: ['./addcustomergroup.component.css'],
})
export class AddcustomergroupComponent implements OnInit {
  addGroup: FormGroup;
  submitted = false;
  customerGroup: customerGroup = {
    name: '',
    descritption: '',
    customers: [],
  };
  customers: createCustomer[] = [];
  selectedCustomers: createCustomer[] = [];

  // currentCustomer: createCustomer = {
  //   customergroup: [],
  // };
  currentCustomer = new createCustomer();
  removeCustomer = new createCustomer();
  // removeCustomer: createCustomer = {
  //   customergroup: [],
  // };
  constructor(
    private customerGroupService: customergroupService,
    private formBuilder: FormBuilder,
    private customerService: customerService,
  ) {}

  ngOnInit(): void {
    this.addGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      //customers: ['', Validators.required],
    });
    this.retrieveCustomers();
  }
  get validation() {
    return this.addGroup.controls;
  }
  async registerCustomerValidate(): Promise<void> {
    this.submitted = true;
    if (this.addGroup.invalid) {
      return;
    } else {
      this.addCustomerGroup();
    }
  }
  async addCustomerGroup(): Promise<void> {
    const userRegister: customerGroup = {
      name: this.customerGroup.name,
      descritption: this.customerGroup.descritption,
      customers: this.selectedCustomers,
    };

    await this.customerGroupService.createCustomerGroup(userRegister);
  }

  async retrieveCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomer();
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
    this.selectedCustomers = this.selectedCustomers.filter(
      (customer) => customer.id != this.removeCustomer.id,
    );
  }
}
