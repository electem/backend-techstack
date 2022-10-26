import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customerservice';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  createCustomerForm!: FormGroup;
  submitted = false;
  customer: Customer = {
    customername: '',
    status: '',
    street: '',
  };

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCustomerForm = this.formBuilder.group({
      customername: ['', Validators.required],
      status: ['', Validators.required],
      street: ['', Validators.required],
      postalcode: ['', Validators.required],
      phonenumber: ['', Validators.required],
    });
  }
  get formValidation() {
    return this.createCustomerForm.controls;
  }
  async saveCustomer(): Promise<void> {
    this.submitted = true;
    if (this.createCustomerForm.invalid) {
      return;
    } else {
      this.saveCustomerDetails();
    }
  }

  async saveCustomerDetails(): Promise<void> {
    const customerData: Customer = {
      customername: this.customer.customername,
      status: this.customer.status,
      street: this.customer.street,
      postalcode: this.customer.postalcode,
      phonenumber: this.customer.phonenumber,
    };
    await this.customerService.createCustomer(customerData);
    this.router.navigate(['/customerList']);
  }
}
