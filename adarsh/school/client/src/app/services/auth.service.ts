import { Injectable } from '@angular/core';
import { LoginUser } from '../models/ligin-user';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

const baseUrl = environment.url;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  userLogin(user: LoginUser) {
    return this.http.post(baseUrl + '/api/auth/signin', user).pipe(
      map((data: any) => {
        localStorage.setItem('tokens', data.accessToken);
        return true;
      }),
      catchError((error: any) => {
        console.log(error);
        return of(false);
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('tokens');
  }
}
