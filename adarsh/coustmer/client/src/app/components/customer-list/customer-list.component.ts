import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customar } from 'src/app/models/customer';
import { CustmerService } from 'src/app/services/custmer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customar[] =[];
 
  status: { name: string; }[] = [];

  constructor(private custmerService: CustmerService,
    private router: Router,) { }

  ngOnInit(): void {
    this.retrieveCustomers();
  }
   
  getStatus() {
    return this.custmerService.getStatusData();
  }
  async retrieveCustomers(): Promise<void> {
    this.customers = await this.custmerService.getCustomer();
  }
}
