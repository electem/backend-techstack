import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../../models/userlogin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
})
export class UserloginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  userLogin: UserLogin = {
    username: '',
    password: '',
  };
  constructor(private formBuilder: FormBuilder) {}
  constructor(private formBuilder: FormBuilder, private router: Router) {}

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
    const userLoginDetails: UserLogin = {
      username: this.userLogin.username,
      password: this.userLogin.password,
    };
  }
}
