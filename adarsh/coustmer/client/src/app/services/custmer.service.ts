import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CustmerService {
  users: User[] = [];

  constructor(private http: HttpClient) { }

  async createNewUser(user: User) {
    return await this.http.post(url + '/addUser', user).toPromise();
  }
}
