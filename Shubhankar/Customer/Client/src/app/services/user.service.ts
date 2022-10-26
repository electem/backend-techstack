import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register';
import { Customer } from '../models/customer';
import { Customergroup } from '../models/customergroup';
import { Unit } from '../models/unit';
import gameJson from '../game.json';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { Company } from '../models/company';
import { Department } from '../models/department';


const baseUrl = environment.url;
export class Status {
  name?: string;
}
export class StatusFilter {
  name?: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // gamedetails = gameJson;

  games: Game[] = gameJson;
  game: Game[] = [];
  constructor(private http: HttpClient) {}

  private status: Status[] = [
    {
      name: 'Active',
    },
    {
      name: 'Inactive',
    },
  ];

  private getfiltercustomerstatus: StatusFilter[] = [
    {
      name: 'active',
    },
    {
      name: 'inactive',
    },
    {
      name: 'All',
    },
  ];

  getfilterstatus() {
    return this.getfiltercustomerstatus;
  }

  getstatus() {
    return this.status;
  }

  createlogin(data: Register): Promise<Register> {
    return this.http.post<Register>(baseUrl + '/loginusers', data).toPromise();
  }

  async getAll(): Promise<Customer[]> {
    return await this.http.get<Customer[]>(baseUrl + '/customer').toPromise();
  }
  createcustomer(data: Customer): Promise<Customer> {
    return this.http.post<Customer>(baseUrl + '/customer', data).toPromise();
  }

  async getcustomergroup(): Promise<Customergroup[]> {
    return await this.http
      .get<Customergroup[]>(baseUrl + '/customergroup')
      .toPromise();
  }

  createcustomergroup(data: Customergroup): Promise<Customergroup> {
    return this.http
      .post<Customergroup>(baseUrl + '/customergroup', data)
      .toPromise();
  }
  updatecustomergroup(data: Customergroup , id:Number) {
    return this.http
      .put<Customergroup>(baseUrl + '/customergroup', data)
      .toPromise();
  }
  getCustomerid(id: Number) {
    return this.http.get(`${baseUrl + '/customer'}/${id}`).toPromise();
  }
  updateCustomer(data: Customer, id: Number) {
    return this.http
      .put<Customer>(`${baseUrl + '/customer'}/${id}`, data)
      .toPromise();
  }
  getCustomergroupid(id: number) {
    return this.http.get(`${baseUrl + '/customergroup'}/${id}`).toPromise();
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${baseUrl + '/customer'}/${id}`).toPromise();
  }
  deleteCustomergroup(id: number) {
    return this.http.delete(`${baseUrl + '/customergroup'}/${id}`).toPromise();
  }

  async getUnit(): Promise<Unit[]> {
    return await this.http.get<Unit[]>(baseUrl + '/unit').toPromise();
  }
  async getAllgames(): Promise<Array<Game>> {
    const records = this.games;
    return records;
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

  async getallCompany(): Promise<Company[]> {
    return await this.http.get<Company[]>(baseUrl + '/company').toPromise();
  }

  async getallDepartment(): Promise<Department[]> {
    return await this.http.get<Department[]>(baseUrl + '/department').toPromise();
  }

  createcompany(data: Company): Promise<Company> {
    return this.http
      .post<Company>(baseUrl + '/company', data)
      .toPromise();
  }

}
