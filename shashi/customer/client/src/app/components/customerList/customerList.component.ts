import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customerservice';

@Component({
  selector: 'app-customer',
  templateUrl: './customerList.component.html',
  styleUrls: ['./customerList.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
 
  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrieveCustomers();
  }
  async retrieveCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomer();
  }
}
