import { Component, OnInit } from '@angular/core';
import { createCustomer } from '../../models/customer.model';
import { customerService } from '../../services/createcustomer.service';
@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
})
export class CustomerlistComponent implements OnInit {
  customers: createCustomer[] = [];
  constructor(private customerService: customerService) {}

  ngOnInit(): void {
    this.retrieveCustomers();
  }

  async retrieveCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomer();
  }
  async deletebyid(id: number) {
    await this.customerService.deletCustomerById(id);
  }
}
