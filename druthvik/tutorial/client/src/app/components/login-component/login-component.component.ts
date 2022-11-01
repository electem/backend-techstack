import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Userlogin } from '../../models/userlogin.model';
import { Role } from '../../services/tutorial.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  roles: Role[] = [];
  userLogin: Userlogin = {
    userName: '',
    password: '',
    role: '',
  };
  loggedInUser: Userlogin[];

  constructor(
    private tutorialService: TutorialService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
    this.roles = this.getRoles();
  }
  get fval() {
    return this.loginForm.controls;
  }

  getRoles() {
    return this.tutorialService.getRoles();
  }
  async loginUser() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginToUser();
    }
  }

  async loginToUser() {
    const userData: Userlogin = {
      userName: this.userLogin.userName,
      password: this.userLogin.password,
      role: this.userLogin.role,
    };
    this.loggedInUser = await this.tutorialService.createUserLogin(userData);
  }
}
