import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customar } from 'src/app/models/customer';
import { CustmerService } from 'src/app/services/custmer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customers: Customar[]=[];
  customer: Customar = {
    name: '',
    status: '',
    postal: '',
    city: '',
  };

  constructor(private custmerService: CustmerService,
    private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveCustomers();
    this.getCustomerId(this.route.snapshot.params.id);
  }
  editPanel(custmer: Customar) {
    this.customer = custmer;
  }
  async retrieveCustomers(): Promise<void> {
    this.customers = await this.custmerService.getCustomer();
  }
  async updatePanel(): Promise<void> {
    const panelData: Customar = {
      id: this.customer.id,
      name: this.customer.name,
      postal: this.customer.postal,
      city: this.customer.city,
      phone:this.customer.phone,

    };
      await this.custmerService.updateCustomer(panelData);
  }
  private async getCustomerId(id: number) {
    this.customer = await this.custmerService.getCustomerByID(id);
  }
}
