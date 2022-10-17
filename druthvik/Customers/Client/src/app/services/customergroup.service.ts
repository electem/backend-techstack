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

  async createCustomerGroup(
    createcustomergroup: customerGroup,
  ): Promise<customerGroup> {
    return await this.http
      .post<customerGroup>(baseUrl + '/customergroup', createcustomergroup)
      .toPromise();
  }
  async getCustomerGroupById(id: number) {
    return await this.http
      .get(`${baseUrl + '/customergroup'}/${id}`)
      .toPromise();
  }

  async updateGroup(customergroup: customerGroup) {
    return await this.http
      .put(baseUrl + '/customergroup', customergroup)
      .toPromise();
  }
}
