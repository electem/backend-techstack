import { Component, OnInit } from '@angular/core';
import { createCustomer } from '../../models/customer.model';
import { customerService, Status } from '../../services/createcustomer.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-customeredit',
  templateUrl: './customeredit.component.html',
  styleUrls: ['./customeredit.component.css'],
})
export class CustomereditComponent implements OnInit {
  customer: createCustomer = {
    name: '',
    phonenumber: null,
    address: '',
    status: '',
  };
  status: Status[];
  constructor(
    private customerService: customerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getCustomerById(this.route.snapshot.params.id);
  }

  async getCustomerById(id: number) {
    this.customer = await this.customerService.getCustomerById(id);
  }
  async updateCustomer(): Promise<void> {
    const customer: createCustomer = {
      id: this.customer.id,
      name: this.customer.name,
      phonenumber: this.customer.phonenumber,
      address: this.customer.address,
      status: this.customer.status,
    };
    await this.customerService.updateCustomer(customer);
  }
}
