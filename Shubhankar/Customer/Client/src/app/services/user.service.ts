import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  createlogin(data: Register): Promise<Register> {
    return this.http.post<Register>(baseUrl + '/loginusers', data).toPromise();
  }
}
