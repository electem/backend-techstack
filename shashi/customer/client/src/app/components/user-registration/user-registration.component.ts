import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistration } from '../../models/userRegistration.model';
import { CustomerService } from 'src/app/services/customerservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  userRegister: UserRegistration = {
    name: '',
    email: '',
    password: '',
  };
  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phonenumber: ['', Validators.required],
    });
  }
  get formValidation() {
    return this.registerForm.controls;
  }
  async saveUserRegister(): Promise<void> {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.saveUserRegisterDetails();
    }
  }

  async saveUserRegisterDetails(): Promise<void> {
    const userRegistrationData: UserRegistration = {
      name: this.userRegister.name,
      email: this.userRegister.email,
      password: this.userRegister.password,
      phonenumber: this.userRegister.phonenumber,
    };
    await this.customerService.createUser(userRegistrationData);
    this.router.navigate(['/userlogin']);
  }
}
