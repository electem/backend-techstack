import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-assigncustomerchildedit',
  templateUrl: './assigncustomerchildedit.component.html',
  styleUrls: ['./assigncustomerchildedit.component.css'],
})
export class AssigncustomerchildeditComponent implements OnInit {
  customers: Customer[] = [];

  constructor() {}

  ngOnInit(): void {}

  async addCustomer(newCustomer: Customer): Promise<void> {
    this.customers.push(newCustomer);
  }
}
