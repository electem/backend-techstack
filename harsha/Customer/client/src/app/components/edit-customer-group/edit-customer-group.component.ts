import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerGroup } from '../../models/customer-group.model';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-edit-customer-group',
  templateUrl: './edit-customer-group.component.html',
  styleUrls: ['./edit-customer-group.component.css'],
})
export class EditCustomerGroupComponent implements OnInit {
  customers: Customer[] = [];
  customerGroup: CustomerGroup = {
    name: '',
    description: '',
    customers: [],
  };

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCustomerGroupById(this.route.snapshot.params.id);
    this.getCustomers();
  }

  async getCustomerGroupById(id: number) {
    this.customerGroup = await this.customerService.getCustomerGroupById(id);
  }

  async getCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomers();
  }
}
