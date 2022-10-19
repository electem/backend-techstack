import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerGroup } from 'src/app/models/customer-group.model';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService, Status } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  submitted: boolean = false;
  registerForm!: FormGroup;
  status?: Status[];
  customer: Customer = {
    name: '',
    status: '',
    address: '',
  };
  customerGroups?: CustomerGroup[];
  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: ['', Validators.required],
    });

    this.status = this.getStatus();
    this.getCustomerGroupList();
  }

  getStatus() {
    return this.customerService.getStatus();
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
    this.saveCustomer();
  }

  async saveCustomer(): Promise<void> {
    const customer: Customer = {
      name: this.customer.name,
      status: this.customer.status,
      address: this.customer.address,
      phoneNo: this.customer.phoneNo,
    };
    await this.customerService.createCustomer(customer);
  }

  async getCustomerGroupList(): Promise<void> {
    this.customerGroups = await this.customerService.getCustomerGroupList();
  }
}
