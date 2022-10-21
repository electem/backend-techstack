import { Component, OnInit } from '@angular/core';
import { createCustomer } from '../../models/customer.model';
import { customerService, Status } from '../../services/createcustomer.service';
@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
})
export class CustomerlistComponent implements OnInit {
  customers: createCustomer[] = [];
  status: Status[];
  status1 = new Status();
  allCustomer: createCustomer[];
  selectedStatus: string;
  statusObject = new Status();
  customerActive: createCustomer[];
  constructor(private customerService: customerService) {}

  ngOnInit(): void {
    this.retrieveCustomers();
    this.status = this.getStatus();
  }

  async retrieveCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomer();
    this.allCustomer = this.customers;
  }
  getStatus() {
    return this.customerService.getStatus();
  }

  onSelected(value: Status) {
    if (value.name === 'all') {
      this.customers = this.allCustomer;
    } else {
      this.selectedStatus = value.name;
      console.log(value.name);
      this.customers = this.allCustomer.filter((obj) => {
        return obj.status && obj.status === value.name;
      });
    }
  }
  async deletebyid(id: number) {
    await this.customerService.deletCustomerById(id);
  }
}
