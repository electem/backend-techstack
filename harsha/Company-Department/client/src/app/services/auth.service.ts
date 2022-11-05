import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Login } from '../models/user-login.model';
import { environment } from 'src/environments/environment';

const AUTH_API = 'http://localhost:8080/api/auth/';
const baseUrl = environment.url;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  userLogin(user: Login) {
    return this.http.post(AUTH_API + 'signin', user).pipe(
      map((data: any) => {
        localStorage.setItem('tokens', data.token);
        return true;
      }),
      catchError((error: any) => {
        console.log(error);
        return of(false);
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(
      baseUrl + 'register',
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
