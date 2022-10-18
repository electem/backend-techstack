import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService, Status } from 'src/app/services/customerservice';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  createCustomerForm!: FormGroup;
  status!: Status[];
  statusList: Status[] = [];
  selectedstatus = new Status();
  submitted = false;
  customer: Customer = {
    customername: '',
    status: '',
    street: '',
    postalcode: '',
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
    this.getStatus();
  }
  get formValidation() {
    return this.createCustomerForm.controls;
  }
  getStatus() {
    this.statusList = this.customerService.getStatus();
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
      street: this.customer.street,
      status:this.customer.status,
      postalcode: this.customer.postalcode,
      phonenumber: this.customer.phonenumber,
    };
    // customerData.status = this.selectedstatus.name;
    await this.customerService.createCustomer(customerData);
    this.router.navigate(['/customerList']);
  }
  onSelected() {
    this.status;
  }
}
