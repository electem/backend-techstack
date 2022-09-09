import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Userlogin } from 'src/app/models/userlogin.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
})
export class UserloginComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  userlogin: Userlogin = {
    userName: '',
    password: '',
    role: '',
  };

  roles: any;

  constructor(
    private formBuilder: FormBuilder,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      roles: ['', [Validators.required]],
    });
    this.roles = this.getRoles();
  }
  get fval() {
    return this.registerForm.controls;
  }
  getRoles() {
    return this.tutorialService.getRoles();
  }

  async loginUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.loginToUser();
    }
  }
  async loginToUser() {
    const userData: Userlogin = {
      userName: this.userlogin.userName,
      password: this.userlogin.password,
      role: this.userlogin.role,
    };
  }
}
