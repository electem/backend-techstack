import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegisterUser } from '../models/registeruser.model';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  constructor(private http: HttpClient) {}

  async createReport(registerUser: RegisterUser): Promise<RegisterUser> {
    return await this.http
      .post<RegisterUser>(baseUrl + '/registeruser', registerUser)
      .toPromise();
  }
}
