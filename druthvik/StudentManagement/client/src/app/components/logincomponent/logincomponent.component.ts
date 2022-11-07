import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css'],
})
export class LogincomponentComponent implements OnInit {
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
        return 'login successfull';
      }
    });
  }
}
