import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { CustomerService, Status } from '../../services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  customer: Customer = {
    name: '',
    status: '',
    address: '',
  };
  status?: Status[];

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomerById(this.route.snapshot.params.id);
  }

  async getCustomerById(id: number) {
    this.customer = await this.customerService.getCustomerById(id);
  }

  async updateCustomer(): Promise<void> {
    const customer = {
      id: this.customer.id,
      name: this.customer.name,
      status: this.customer.status,
      address: this.customer.address,
      phoneNo: this.customer.phoneNo,
    };
    await this.customerService.updateCustomer(this.customer.id!, customer);
    this.router.navigate(['/customer-group-list']);
  }
}
