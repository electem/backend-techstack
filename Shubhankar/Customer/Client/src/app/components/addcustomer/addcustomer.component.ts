import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {
  addcustomer!: FormGroup;
  customer: Customer = {
    name: '',
    status: '',
    address: '',
    phonenumber: 0,
   };

  constructor( private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }
  submitted = false;
  ngOnInit(): void {
    this.addcustomer = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: [' ', Validators.required],
    });
  }
  get fval() {
    return this.addcustomer.controls;
  }
  async signup() {
    this.submitted = true;
    if (this.addcustomer.invalid) {
      return;
    }
}
async Submit() {
  this.submitted = true;
  const customer: Customer = {
    name: this.customer.name,
    status: this.customer.status,
    address: this.customer.status,
    phonenumber: this.customer.phonenumber,
  };
  await this.userService.createcustomer(customer);
  
}
}
