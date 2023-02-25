import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Login } from '../models/user-login.model';

const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  userLogin(user: Login) {
    return this.http.post(AUTH_API + 'login', user).pipe(
      map((data: any) => {
        localStorage.setItem('tokens', data.token);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  register(username: string, password: string) {
    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  signOut(): void {
    localStorage.removeItem('tokens');
  }
}
