import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/user-login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  userLogin: Login = {
    username: '',
    password: '',
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.userLogin(this.userLogin).subscribe(
      () => {
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.router.navigate(['/school-list']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
