import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistration } from '../../models/userRegistration.model';
import { CustomerService } from '../../services/customerservice';
import { UserLogin } from '../../models/userLogin.model';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
})
export class UserloginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  userlogin: UserLogin = {
    username: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private CustomerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }
  get fval() {
    return this.loginForm.controls;
  }
  async loginUserValidate(): Promise<void> {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginUser();
    }
  }
  async loginUser(): Promise<void> {
    const userData: UserLogin = {
      username: this.userlogin.username,
      password: this.userlogin.password,
    };
  }
}
