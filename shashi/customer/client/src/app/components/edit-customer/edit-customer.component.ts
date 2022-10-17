import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService, Status } from 'src/app/services/customerservice';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  customer: Customer = {
    customername: '',
    street: '',
    status: '',
  };
  status: Status[] = [];
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getCustomerById(this.route.snapshot.params.id);
    this.status = this.getStatus();
  }
  getStatus() {
    return this.customerService.getStatus();
  }
  async getCustomerById(id: number): Promise<void> {
    this.customer = await this.customerService.getCustomerById(id);
  }
  async updateCustomer(): Promise<void> {
    const customer: Customer = {
      id: this.customer.id,
      customername: this.customer.customername,
      phonenumber: this.customer.phonenumber,
      street: this.customer.street,
      status: this.customer.status,
      postalcode: this.customer.postalcode,
    };
    await this.customerService.updateCustomer(customer);
  }
}
