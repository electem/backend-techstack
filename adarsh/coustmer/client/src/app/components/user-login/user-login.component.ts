import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from 'src/app/models/loginUser';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginform!: FormGroup;
  submitted: boolean = false;
  loginUser: LoginUser = {
    username: '',
    password: '',
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  signup() {
    this.submitted = true;
    if (this.loginform.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
    this.saveuser();
  }
  get fval() {
    return this.loginform.controls;
  }
  async saveuser(): Promise<void> {
    const data = {
      username: this.loginUser.username,
      password: this.loginUser.password,
    };
  }
}
