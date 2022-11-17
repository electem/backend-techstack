import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  id?: number;
  isLoggedIn?: boolean;

  constructor(private auth: AuthService, private router: Router,
    private route: ActivatedRoute) {}
  title = 'Angular 12 Crud'

  logout(): void {
    this.auth.signOut();
    this.router.navigate(['companylist']);
  }
}