import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular School Teacher Student List';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
