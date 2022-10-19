import { Component, OnInit } from '@angular/core';
import { CustomerGroup } from 'src/app/models/customer-group.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-group-listing',
  templateUrl: './customer-group-listing.component.html',
  styleUrls: ['./customer-group-listing.component.css'],
})
export class CustomerGroupListingComponent implements OnInit {
  customerGroups?: CustomerGroup[];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomerGroupList();
  }

  async getCustomerGroupList(): Promise<void> {
    this.customerGroups = await this.customerService.getCustomerGroupList();
  }
}
