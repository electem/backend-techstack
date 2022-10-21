import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Customergroup } from 'src/app/models/customergroup';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addcustomergroup',
  templateUrl: './addcustomergroup.component.html',
  styleUrls: ['./addcustomergroup.component.css'],
})
export class AddcustomergroupComponent implements OnInit {
  submitted: boolean = false;
  addcustomer!: FormGroup;
  customers: Customer[] = [];
  customerlist: Customer[] = [];
  addedlist: Customer[] = [];
  selectedCustomer: Customer = {};
  removedCustomer: Customer = {};
  customergroup: Customergroup = {
    name: '',
    description: '',
    customers: [],
  };
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addcustomer = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      customers: ['', Validators.required],
    });
    this.retrievecustomers();
  }
  async retrievecustomers(): Promise<void> {
    this.customers = await this.userService.getAll();
    console.log(this.customers);
  }

  public toggleSelection(customer: Customer) {
    this.selectedCustomer = customer;
  }
  public moveSelected() {
    if (this.selectedCustomer != null) {
      this.customerlist.push(this.selectedCustomer);
      const index = this.customers.indexOf(this.selectedCustomer);
      if (index > -1) {
        this.customers.splice(index, 1);
      }
    }
  }

  public toggleSelections(customer: Customer) {
    this.removedCustomer = customer;
  }
  public moveRight() {
    if (this.removedCustomer != null) {
      this.customers.push(this.removedCustomer);
      const index = this.customerlist.indexOf(this.removedCustomer);
      if (index > -1) {
        this.customerlist.splice(index, 1);
      }
    }
  }

  async getSubmit() {
    const customergroup: Customergroup = {
      name: this.customergroup.name,
      description: this.customergroup.description,
      customers: this.customerlist,
    };
    await this.userService.createcustomergroup(customergroup);
    this.router.navigate(['/group']);
  }

  Cancel() {
    this.router.navigate(['/group']);
  }

  get fval() {
    return this.addcustomer.controls;
  }
  async signup() {
    this.submitted = true;
    if (this.addcustomer.invalid) {
      return;
    }
  }
}