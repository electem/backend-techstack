import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userlogin } from 'src/app/models/userlogin.model';
import { Role, TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
})
export class UserloginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  userlogin: Userlogin = {
    userName: '',
    password: '',
    role: '',
  };
  loggedInUser?: Userlogin;
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private tutorialService: TutorialService,
    private router: Router
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

  async loginUserValidate() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginUser();
    }
  }
  async loginUser() {
    const userData: Userlogin = {
      userName: this.userlogin.userName,
      password: this.userlogin.password,
      role: this.userlogin.role,
    };
    this.loggedInUser = await this.tutorialService.createUserlogin(userData);
    this.router.navigate(['/tutorials']);
  }
}
