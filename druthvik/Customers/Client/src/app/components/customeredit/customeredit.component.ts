import { Component, OnInit } from '@angular/core';
import { createCustomer } from '../../models/customer.model';
import { customerService, Status } from '../../services/createcustomer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Unit } from '../../models/unit.model';
@Component({
  selector: 'app-customeredit',
  templateUrl: './customeredit.component.html',
  styleUrls: ['./customeredit.component.css'],
})
export class CustomereditComponent implements OnInit {
  customer: createCustomer = {
    name: '',
    address: '',
    phonenumber: null,
    status: '',
    unit: [],
  };
  unit: Unit[] = [];
  status: Status[];
  units?: Unit[];
  selectedUnits: Unit[] = [];
  selectedUnit = new Unit();
  constructor(
    private customerService: customerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCustomerById(this.route.snapshot.params.id);
    this.retrieveUnits();
  }

  async getCustomerById(id: number) {
    this.customer = await this.customerService.getCustomerById(id);
  }
  async updateCustomer(): Promise<void> {
    const customer: createCustomer = {
      id: this.customer.id,
      name: this.customer.name,
      phonenumber: this.customer.phonenumber,
      address: this.customer.address,
      status: this.customer.status,
      unit: this.customer.unit,
    };
    await this.customerService.updateCustomer(customer);
  }

  async deletebyid() {
    await this.customerService.deletCustomerById(this.customer.id);
    this.router.navigate(['/customerlist']);
  }

  async retrieveUnits(): Promise<void> {
    this.unit = await this.customerService.getUnits();
  }

  onSelected(value: Unit) {
    if (this.unit) {
      for (let unit of this.unit) {
        if (unit.id == value.id) {
          this.selectedUnits.push(unit);
        }
      }
    }
  }
}
