import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomarGroup } from 'src/app/models/customergroup';
import { CustmerService } from 'src/app/services/custmer.service';

@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html',
  styleUrls: ['./customer-group.component.css']
})
export class CustomerGroupComponent implements OnInit {
  customerGroups: CustomarGroup[] = [];
  constructor(private custmerService: CustmerService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getCustomerGroupList();
  }
async getCustomerGroupList(): Promise<void> {
    this.customerGroups = await this.custmerService.getCustomerGroup();
  }
}
