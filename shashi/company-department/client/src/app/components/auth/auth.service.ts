import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Login } from '../../models/login.model';
import { TokenModel } from './token.model';
import { UserProfile } from './user-profile';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  userProfile = new BehaviorSubject<UserProfile | null>(null);

  userLogin(payload: Login) {
    return this.httpClient
      .post('http://localhost:3000/auth/login', payload)
      .pipe(
        map((data) => {
          const token = data as TokenModel;
          localStorage.setItem('tokens', token.accessToken);

          return true;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  signOut(): void {
    localStorage.removeItem('tokens');
  }
}
