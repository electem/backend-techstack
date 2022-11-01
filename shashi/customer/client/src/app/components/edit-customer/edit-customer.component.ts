import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService, Status } from 'src/app/services/customerservice';
import { Unit } from 'src/app/models/unit.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  customer: Customer = {
    customername: '',
    street: '',
    status: '',
  };
  units!: Unit[];
  selectedUnitsList: Unit[] = [];
  public selectedunit = new Unit();
  unitsList: Unit[] = [];
  status: Status[] = [];
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getCustomerById(this.route.snapshot.params.id);
    this.getStatus();
    this.getUnits();
  }
  getStatus() {
    this.status = this.customerService.getStatus();
  }
  async getCustomerById(id: number): Promise<void> {
    this.customer = await this.customerService.getCustomerById(id);
  }
  async getUnits(): Promise<void> {
    this.unitsList = await this.customerService.getUnits();
  }
  onSelected(value: Unit) {
    if (this.unitsList) {
      for (const unit of this.unitsList) {
        if (unit.id === value.id) {
          this.selectedUnitsList.push(unit);
        }
      }
    }
  }
  async updateCustomer(): Promise<void> {
    const customer: Customer = {
      id: this.customer.id,
      customername: this.customer.customername,
      phonenumber: this.customer.phonenumber,
      street: this.customer.street,
      postalcode: this.customer.postalcode,
    };
    customer.units = this.selectedUnitsList;
    await this.customerService.updateCustomer(customer);
  }
}
