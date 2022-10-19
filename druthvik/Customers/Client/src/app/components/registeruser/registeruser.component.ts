import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../../models/userregister.model';
import { UserRegisterService } from '../../services/userregister.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css'],
})
export class RegisteruserComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  userRegister: RegisterUser = {
    name: '',
    email: '',
    password: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private userResgisterService: UserRegisterService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phonenumber: ['', Validators.required],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  async registerCustomerValidate(): Promise<void> {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.registerCustomer();
    }
  }
  async registerCustomer(): Promise<void> {
    const userRegister: RegisterUser = {
      name: this.userRegister.name,
      email: this.userRegister.email,
      password: this.userRegister.password,
      phonenumber: this.userRegister.phonenumber,
    };
    await this.userResgisterService.registerUser(userRegister);
  }
}
