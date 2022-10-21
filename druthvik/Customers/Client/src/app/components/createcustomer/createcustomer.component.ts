import { Component, OnInit } from '@angular/core';
import { Status } from '../../services/createcustomer.service';
import { customerService } from '../../services/createcustomer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createCustomer } from '../../models/customer.model';
import { customergroupService } from 'src/app/services/customergroup.service';
import { customerGroup } from '../../models/customergroup.model';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css'],
})
export class CreatecustomerComponent implements OnInit {
  registerCustomerForm: FormGroup;
  submitted = false;
  status: Status[] = [];
  createcustomer: createCustomer = {
    name: '',
    phonenumber: null,
    address: '',
    unit: [],
    status: '',
  };

  constructor(
    private customerService: customerService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.registerCustomerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phonenumber: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.status = this.getStatus();
  }
  get f() {
    return this.registerCustomerForm.controls;
  }

  getStatus() {
    return this.customerService.getStatus();
  }

  async registerCustomerValidate(): Promise<void> {
    this.submitted = true;
    if (this.registerCustomerForm.invalid) {
      return;
    } else {
      this.registerCustomer();
    }
  }
  async registerCustomer(): Promise<void> {
    const customerRegister: createCustomer = {
      name: this.createcustomer.name,
      phonenumber: this.createcustomer.phonenumber,
      address: this.createcustomer.address,
      unit: this.createcustomer.unit,
      status: this.createcustomer.status,
    };
    await this.customerService.createCustomer(customerRegister);
  }
}
