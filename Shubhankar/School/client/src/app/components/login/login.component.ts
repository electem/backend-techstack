import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginUser } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: LoginUser = {
    username: '',
    password: '',
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = 'login failed';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
  }

  LoginDetail() {
    this.authService.userLogin(this.form).subscribe((data) => {
      if (data) {
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        alert('username and password is correct login successful');
        this.router.navigate(['dash']);
      }
      else{
       
        alert('username and password is not valid login unsuccessful');
        this.isLoginFailed = true;
      };
    });
  }
}
