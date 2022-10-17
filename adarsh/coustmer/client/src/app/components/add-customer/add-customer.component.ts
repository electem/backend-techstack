import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customar } from 'src/app/models/customer';
import { CustmerService, Status } from 'src/app/services/custmer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  newCustomer: Customar = {
    name: '',
    status: '',
    postal: '',
    city: '',
  };
  status: Status[] = [];

  constructor(private custmerService: CustmerService, private router: Router) {}

  ngOnInit(): void {
    this.status = this.getStatus();
  }
  async saveNewCustomer(): Promise<void> {
    const newCustomerData = {
      name: this.newCustomer.name,
      status: this.newCustomer.status,
      postal: this.newCustomer.postal,
      city: this.newCustomer.city,
      phone: this.newCustomer.phone,
     
    };
    await this.custmerService.createNewCustomer(newCustomerData);
    this.router.navigate(['login']);
  }
  getStatus() {
    return this.custmerService.getStatusData();
  }
}
