import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginUser } from 'src/app/models/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  login: LoginUser = {
    username:'',
    password:'',
  };
  submitted = false;
  constructor(private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

 get fval() {
    return this.loginform.controls;
  }
  async signup() {
    if (this.loginform.invalid) {
      return;
    }
  }
  LoginDetail() {
    this.authService.userLogin(this.login).subscribe((data) => {
      if (data) {
        this.router.navigate(['admin']);
      }
    });
  }
 
}