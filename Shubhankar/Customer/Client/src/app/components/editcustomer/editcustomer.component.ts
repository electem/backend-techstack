import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Unit } from 'src/app/models/unit';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css'],
})
export class EditcustomerComponent implements OnInit {
  submitted = false;
  editcustomer!: FormGroup;
  customer: Customer = {
    name: '',
    status: '',
    address: '',
    phonenumber: 0,
  };

  units?: Unit[] = [];

  constructor(
    private userservice: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editcustomer = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
    });
    this.getCustomerById(this.route.snapshot.params.id);
    this.retrieveUnits();
  }

  async getCustomerById(id: number) {
    this.customer = await this.userservice.getCustomerid(id);
  }

  async retrieveUnits(): Promise<void> {
    this.units = await this.userservice.getUnit();
  }

  async updateCustomer(): Promise<void> {
    this.submitted = true;
    if (this.editcustomer.invalid) {
      return;
    } else {
      const customer: Customer = {
        name: this.customer.name,
        status: this.customer.status,
        address: this.customer.address,
        phonenumber: this.customer.phonenumber,
    };
      await this.userservice.updateCustomer(customer,this.customer.id!);
      this.router.navigate(['/list']);
    }
  }
  get fval() {
    return this.editcustomer.controls;
  }
  async signup() {
    this.submitted = true;
    if (this.editcustomer.invalid) {
      return;
    }
  }
}
