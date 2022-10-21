import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { customerGroup } from '../models/customergroup.model';

const baseUrl = environment.url;
const baseUrl2 = environment.url1;
const baseUrl1 = environment.url1;

@Injectable({
  providedIn: 'root',
})
export class customergroupService {
  constructor(private http: HttpClient) {}

  async getCustomerGroup(): Promise<customerGroup[]> {
    return await this.http
      .get<customerGroup[]>(baseUrl2 + '/customergroups')
      .get<customerGroup[]>(baseUrl1 + '/customergroups')
      .toPromise();
  }

  async createCustomerGroup(
    createcustomergroup: customerGroup,
  ): Promise<customerGroup> {
    return await this.http
      .post<customerGroup>(baseUrl2 + '/customergroups', createcustomergroup)
      .post<customerGroup>(baseUrl1 + '/customergroups', createcustomergroup)
      .toPromise();
  }
  async getCustomerGroupById(id: number) {
    return await this.http
      .get(`${baseUrl2 + '/customergroups'}/${id}`)
      .get(`${baseUrl1 + '/customergroups'}/${id}`)
      .toPromise();
  }

  async updateGroup(customergroup: customerGroup) {
    return await this.http
      .put(baseUrl2 + '/customergroups', customergroup)
      .put(baseUrl1 + '/customergroups', customergroup)
      .toPromise();
  }
  async deletCustomerGroupById(id: number) {
    return await this.http
      .delete(`${baseUrl2 + '/customergroups'}/${id}`)
      .delete(`${baseUrl1 + '/customergroups'}/${id}`)
      .toPromise();
  }
}
