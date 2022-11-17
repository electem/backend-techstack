import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, of } from 'rxjs';
import { LoginUser } from '../models/login';
import { TokenModel } from './token-model';
import { UserProfile } from './userprofile';
import { map ,catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  userProfile = new BehaviorSubject<UserProfile | null>(null);
  jwtService: JwtHelperService = new JwtHelperService();

  userLogin(payload: LoginUser) {
    return this.httpClient
      .post('http://localhost:3000/auth/login', payload)
      .pipe(
        map((data) => {
          var token = data as TokenModel;
          localStorage.setItem('tokens', token.access_token);
          var userInfo = this.jwtService.decodeToken(
            token.access_token,
          ) as UserProfile;

          this.userProfile.next(userInfo);

          return true;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        }),
      );
  }

  signOut(): void {
    localStorage.removeItem('tokens');
  }
}