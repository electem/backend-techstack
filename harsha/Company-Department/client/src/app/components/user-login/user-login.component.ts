import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/user-login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  userLogin: Login = {
    username: '',
    password: '',
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.userLogin(this.userLogin).subscribe((data) => {
      if (data) {
        this.router.navigate(['/company-list']);
      }
    });
  }
}
