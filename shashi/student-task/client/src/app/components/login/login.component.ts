import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: Login = {
    username: '',
    password: '',
  };
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  userLogin() {
    this.authService.userLogin(this.loginForm).subscribe((data) => {
      if (data) {
        this.router.navigate(['dashboard']);
      }
    });
  }
}
