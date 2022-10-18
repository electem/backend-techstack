import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerGroup } from 'src/app/models/customerGroup.model';
import { CustomerService } from 'src/app/services/customerservice';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-edit-customer-group',
  templateUrl: './edit-customer-group.component.html',
  styleUrls: ['./edit-customer-group.component.css'],
})
export class EditCustomerGroupComponent implements OnInit {
  customerGroup: CustomerGroup = {
    groupname: '',
    description: '',
  };
  customers!: Customer[];
  public selectedCustomer = new Customer();
  selectedCustomers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCustomerGroupById(this.route.snapshot.params.id);
    this.retrieveCustomers();
  }
  async getCustomerGroupById(id: number): Promise<void> {
    this.customerGroup = await this.customerService.getCustomerGroupById(id);
  }
  async retrieveCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomers();
  }

  onSelected(value: Customer) {
    if (this.customers) {
      for (let customer of this.customers) {
        if (customer.id == value.id) {
          this.selectedCustomers.push(customer);
        }
      }
    }
  }
  async updateCustomerGroup(): Promise<void> {
    const customerGroup: CustomerGroup = {
      id: this.customerGroup.id,
      groupname: this.customerGroup.groupname,
      description: this.customerGroup.description,
      customers: this.selectedCustomers,
    };
    await this.customerService.updateCustomerGroup(customerGroup);
  }
}
