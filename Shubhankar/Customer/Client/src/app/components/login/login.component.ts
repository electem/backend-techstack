import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '../../models/login';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  login: LoginUser = {
    username: '',
    password: '',
  };
  constructor(
    private userservice: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async loginData() {
    if (this.loginform.invalid) {
      return;
    } else {
      this.LoginDetail();
    }
  }
  async LoginDetail() {
    const login: LoginUser = {
      username: this.login.username,
      password: this.login.password,
    };
  }

  get fval() {
    return this.loginform.controls;
  }
  async signup() {
    if (this.loginform.invalid) {
      return;
    }
  }

  async Register() {
    this.router.navigate(['/Registerusers']);
  }
}
