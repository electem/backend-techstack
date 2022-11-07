import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}

  title = 'Angular Crud';

  logout(): void {
    this.auth.signOut();
    this.router.navigate(['companylisting']);
  }
}
