import { Component, OnInit } from '@angular/core';
import { customerGroup } from '../../models/customergroup.model';
import { customergroupService } from 'src/app/services/customergroup.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customergrouplist',
  templateUrl: './customergrouplist.component.html',
  styleUrls: ['./customergrouplist.component.css'],
})
export class CustomergrouplistComponent implements OnInit {
  customerGroup: customerGroup[] = [];
  constructor(
    private customerGroupService: customergroupService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.retrieveCustomers();
  }

  async retrieveCustomers(): Promise<void> {
    this.customerGroup = await this.customerGroupService.getCustomerGroup();
  }

  async deleteGroupById(id: number) {
    await this.customerGroupService.deletCustomerGroupById(id);
    this.router.navigate(['/customergroup']);
  }
}
