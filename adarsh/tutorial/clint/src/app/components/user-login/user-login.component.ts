import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/userLogin.model';
import { FileUploadService} from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})

export class UserLoginComponent implements OnInit {
  loginform!: FormGroup;
  login: UserLogin = {
    userName: '',
    password: '',
    role: '',
  };
  submitted = false;
  role?: { role: string }[];

  constructor(
    private fileUploadService: FileUploadService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
    this.role = this.getRoledata();
  }

  getRoledata() {
    return this.fileUploadService.getRoles();
  }

  async saveUser() {
    this.submitted = true;
    if (this.loginform.invalid) {
      return;
    } else {
      this.LoginDetail();
    }
  }
  async LoginDetail() {
    const login: UserLogin = {
      userName: this.login.userName,
      password: this.login.password,
      role: this.login.role,
    };
    await this.fileUploadService.createlogin(login);
    this.router.navigate(['/tutorials']);
  }

  get validation() {
    return this.loginform.controls;
  }

  async signup() {
    this.submitted = true;
    if (this.loginform.invalid) {
      return;
    }
  }
}