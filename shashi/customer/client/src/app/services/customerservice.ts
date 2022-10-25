import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from '../models/userRegistration.model';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';
import { CustomerGroup } from '../models/customerGroup.model';
import { Unit } from '../models/unit.model';
import Playerjson from '../services/game.json';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
const baseUrl = environment.url;
const baseUrl2 = environment.url2;

export class Status {
  id?: number;
  name?: string;
}
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private status: Status[] = [
    { id: 1, name: 'active' },
    { id: 2, name: 'inactive' },
    { id: 3, name: 'All List' },
  ];
  gamesList = Playerjson;
  game: Game[] = [];
  private players: Player[] = [
    { id: 1, playername: 'xxx' },
    { id: 2, playername: 'yyy' },
    { id: 3, playername: 'zzz' },
    { id: 4, playername: 'xox' },
    { id: 5, playername: 'yoy' },
  ];
  constructor(private http: HttpClient) {}

  getStatus() {
    return this.status;
  }
  async getGames(): Promise<Game[]> {
    return this.gamesList;
  }
  async getPlayers(): Promise<Player[]> {
    return this.players;
  }
  async getGamesPlayers(): Promise<Game[]> {
    return this.gamesList.filter((object) => {
      return object.players;
    });
  }
  async getGameById(id: number): Promise<Game> {
    this.game = this.gamesList.filter((object) => {
      return object.id == id;
    });
    return this.game[0];
  }
  async createUser(userData: UserRegistration): Promise<UserRegistration> {
    return this.http
      .post<UserRegistration>(baseUrl + '/userregistration', userData)
      .toPromise();
  }
  async getCustomers(): Promise<Customer[]> {
    return await this.http.get<Customer[]>(baseUrl2 + '/customer').toPromise();
  }
  async createCustomer(customerData: Customer): Promise<Customer> {
    return this.http
      .post<Customer>(baseUrl2 + '/customer', customerData)
      .toPromise();
  }
  async getCustomerById(id: number): Promise<Customer> {
    return await this.http.get(`${baseUrl2 + '/customer'}/${id}`).toPromise();
  }
  async updateCustomer(customer: Customer): Promise<Customer> {
    return await this.http
      .put(`${baseUrl2 + '/customer'}/${customer.id}`, customer)
      .toPromise();
  }
  async getCustomerGroups(): Promise<CustomerGroup[]> {
    return await this.http
      .get<CustomerGroup[]>(baseUrl2 + '/customergroup')
      .toPromise();
  }
  async createCustomerGroup(
    customerGroupData: CustomerGroup
  ): Promise<CustomerGroup> {
    return this.http
      .post<CustomerGroup>(baseUrl2 + '/customergroup', customerGroupData)
      .toPromise();
  }
  async getCustomerGroupById(id: number): Promise<CustomerGroup> {
    return await this.http
      .get(`${baseUrl2 + '/customergroup'}/${id}`)
      .toPromise();
  }
  async updateCustomerGroup(
    customerGroup: CustomerGroup
  ): Promise<CustomerGroup> {
    return await this.http
      .put(`${baseUrl2 + '/customergroup'}/${customerGroup.id}`, customerGroup)
      .toPromise();
  }
  async deleteCustomerGroupById(id: number): Promise<CustomerGroup> {
    return await this.http
      .delete(`${baseUrl2 + '/customergroup'}/${id}`)
      .toPromise();
  }
  async getUnits(): Promise<Unit[]> {
    return await this.http.get<Unit[]>(baseUrl2 + '/unit').toPromise();
  }
}
