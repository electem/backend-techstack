import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';
import { CustomerGroup } from '../models/customer-group.model';
import gamesList from 'src/app/gamesList.json';
import { Game } from '../models/game.model';

const baseUrl = environment.url;
export class Status {
  name?: string;
}
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private status: Status[] = [
    { name: 'active' },
    { name: 'inactive' },
    { name: 'All' },
  ];
  games: Game[] = gamesList;
  game: Game[] = [];

  constructor(private http: HttpClient) {}

  getStatus() {
    return this.status;
  }

  async createUser(user: User): Promise<User> {
    return await this.http.post<User>(baseUrl + 'createUser', user).toPromise();
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    return await this.http
      .post<Customer>(baseUrl + 'createCustomer', customer)
      .toPromise();
  }

  async getCustomers(): Promise<Customer[]> {
    return await this.http.get<Customer[]>(baseUrl + 'customers').toPromise();
  }

  async createCustomerGroup(
    customerGroup: CustomerGroup
  ): Promise<CustomerGroup> {
    return await this.http
      .post<CustomerGroup>(baseUrl + 'createCustomerGroup', customerGroup)
      .toPromise();
  }

  async getCustomerGroupList(): Promise<CustomerGroup[]> {
    return await this.http
      .get<CustomerGroup[]>(baseUrl + 'customerGroups')
      .toPromise();
  }

  async getCustomerGroupById(id: number) {
    return await this.http
      .get(`${baseUrl + 'customerGroup'}/${id}`)
      .toPromise();
  }

  async getCustomerById(id: number) {
    return await this.http.get(`${baseUrl + 'customer'}/${id}`).toPromise();
  }

  async updateCustomerGroup(
    id: number,
    customerGroup: CustomerGroup
  ): Promise<CustomerGroup> {
    return await this.http
      .put(`${baseUrl + 'updateCustomerGroup'}/${id}`, customerGroup)
      .toPromise();
  }

  async updateCustomer(id: number, customer: Customer): Promise<Customer> {
    return await this.http
      .put(`${baseUrl + 'updateCustomer'}/${id}`, customer)
      .toPromise();
  }

  async getGamesList() {
    return await this.games;
  }

  async getGameById(id: number) {
    this.game = this.games.filter((input) => {
      return input.id == id;
    });
    return await this.game[0];
  }

  async updateGame(game: Game) {
    console.log(game);
  }
}
