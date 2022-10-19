import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Status, UserService } from 'src/app/services/user.service';

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
  };
  status?:Status[]=[]

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
    this.status = this.getStatusdata();
  }

  getStatusdata() {
    return this.userService.getstatus();
  }

  get fval() {
    return this.addcustomer.controls;
  }
 Addcustomer() {
    this.submitted = true;
    if (this.addcustomer.invalid) {
      return;
    }
    this.Submit();
}
async Submit() {
  this.submitted = true;
  const customer: Customer = {
    name: this.customer.name,
    status: this.customer.status,
    address: this.customer.address,
    phonenumber: this.customer.phonenumber,
  };
  await this.userService.createcustomer(customer);
  if(this.submitted==true){
  this.router.navigate(['/list']);
  }
  return 
}
}
