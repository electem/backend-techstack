import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from 'src/app/models/loginUser.model';
import { Role, TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  roles: Role[] = [];
  submitted: boolean = false;
  loginUser: LoginUser = {
    userName: '',
    password: '',
    role: '',
  };
  loggedInUser?: LoginUser;
  constructor(
    private formBuilder: FormBuilder,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.roles = this.getRoles();
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  get fval() {
    return this.loginForm.controls;
  }
  getRoles() {
    return this.tutorialService.getRolesData();
  }

  async submitUser() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginToUser();
    }
  }

  async loginToUser() {
    const userData: LoginUser = {
      userName: this.loginUser.userName,
      password: this.loginUser.password,
      role: this.loginUser.role,
    };
    this.loggedInUser = await this.tutorialService.createUserLogin(userData);
  }
}
