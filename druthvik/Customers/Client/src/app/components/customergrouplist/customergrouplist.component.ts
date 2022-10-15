import { Component, OnInit } from '@angular/core';
import { customerGroup } from '../../models/customergroup.model';
import { customergroupService } from 'src/app/services/customergroup.service';
@Component({
  selector: 'app-customergrouplist',
  templateUrl: './customergrouplist.component.html',
  styleUrls: ['./customergrouplist.component.css'],
})
export class CustomergrouplistComponent implements OnInit {
  customerGroup: customerGroup[] = [];
  constructor(private customerGroupService: customergroupService) {}

  ngOnInit(): void {
    this.retrieveCustomers();
  }

  async retrieveCustomers(): Promise<void> {
    this.customerGroup = await this.customerGroupService.getCustomerGroup();
  }
}
