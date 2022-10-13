import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }
  get formValidation() {
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
