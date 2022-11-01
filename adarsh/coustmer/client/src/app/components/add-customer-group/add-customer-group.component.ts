import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customar } from 'src/app/models/customer';
import { CustomarGroup } from 'src/app/models/customergroup';
import { CustmerService } from 'src/app/services/custmer.service';

@Component({
  selector: 'app-add-customer-group',
  templateUrl: './add-customer-group.component.html',
  styleUrls: ['./add-customer-group.component.css'],
})
export class AddCustomerGroupComponent implements OnInit {
  newCustomerGroup: CustomarGroup = {
    name: '',
    discription: '',
    customars: [],
  };
  customers: Customar[] = [];
  submitted: boolean = false;
  selectedCustomerName: Customar[] = [];
  selectedNewName: Customar = new Customar();
  removeCustomerName: Customar = new Customar();

  constructor(
    private custmerService: CustmerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrieveCustomers();
  }
  async saveCustomerGroup(): Promise<void> {
    const customerGroup: CustomarGroup = {
      name: this.newCustomerGroup.name,
      discription: this.newCustomerGroup.discription,
      customars: this.selectedCustomerName,
    };
    await this.custmerService.createCustomerGroup(customerGroup);
    this.router.navigate(['/customergroup']);
  }
  async retrieveCustomers(): Promise<void> {
    this.customers = await this.custmerService.getCustomer();
  }
  selectedCustomerFromList(custmer: Customar) {
    this.selectedNewName = custmer;
  }

  selectedCustomer() {
    this.selectedCustomerName.push(this.selectedNewName);
    this.customers.splice(this.customers.indexOf(this.selectedNewName!), 1);
  }

  selectedCustomerFromListToRemove(custmer: Customar) {
    this.removeCustomerName = custmer;
  }

  removeCustomerFromNewList() {
    this.customers.push(this.removeCustomerName!);
    this.selectedCustomerName.splice(
      this.selectedCustomerName.indexOf(this.removeCustomerName!),
      1
    );
  }
  
}
