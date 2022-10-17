import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerGroup } from 'src/app/models/customerGroup.model';
import { CustomerService } from 'src/app/services/customerservice';

@Component({
  selector: 'app-customer-group-list',
  templateUrl: './customer-group-list.component.html',
  styleUrls: ['./customer-group-list.component.css'],
})
export class CustomerGroupListComponent implements OnInit {
  customerGroups: CustomerGroup[] = [];
  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrieveCustomerGroups();
  }
  async retrieveCustomerGroups(): Promise<void> {
    this.customerGroups = await this.customerService.getCustomerGroups();
  }
}
