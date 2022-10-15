import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { customerGroup } from '../models/customergroup.model';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class customergroupService {
  constructor(private http: HttpClient) {}

  async getCustomerGroup(): Promise<customerGroup[]> {
    return await this.http
      .get<customerGroup[]>(baseUrl + '/customergroup')
      .toPromise();
  }
}
