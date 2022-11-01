import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';
import { Category } from '../models/category.model';
import { Comments } from '../models/comment.model';
import { LoginUser } from '../models/loginUser.model';
import { Student } from '../models/studentform.model';

const baseUrl = 'http://localhost:8080/api/tutorials';
const tutorialUrl = 'http://localhost:8080/tutorials';
const categoryUrl = 'http://localhost:8080/categories';
const url = 'http://localhost:8080/addTutorials';
const updateUrl = 'http://localhost:8080/updateTutorials';
const authenticate = 'http://localhost:8080/authenticate';
const commentUrl = 'http://localhost:8080/coments';
const getcommentUrl = 'http://localhost:8080/addComment';
const getLoginUser = 'http://localhost:8080/addloginuser';
const getStudentData = 'http://localhost:8080/studentlData';

export class Role {
  name?: String;
}
@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  tokenIs!: string;
  tutorial: Tutorial[] = [];
  students:Student[] =[];

  constructor(private http: HttpClient) {}

  private countries = [
    { name: 'India' },
    { name: 'England' },
    { name: 'Brazil' },
    { name: 'Italy' },
    { name: 'Germany' },
  ];
  private roles: Role[] = [{ name: 'Author' }, { name: 'Comment' }];

  getCountriesData() {
    return this.countries;
  }
  getRolesData() {
    return this.roles;
  }

  async getCategories(): Promise<Category[]> {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http
      .get<Category[]>(categoryUrl, { headers: header })
      .toPromise();
  }

  async getAll(): Promise<Tutorial[]> {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http
      .get<Tutorial[]>(tutorialUrl, { headers: header })
      .toPromise();
  }

  getTutorials(): Observable<String[]> {
    return this.http.get<String[]>(`${tutorialUrl}`);
  }

  getData() {
    return 'data is fetched';
  }

  get(id: any) {
    const index = this.tutorial.findIndex((u) => id == u.id);
    return this.tutorial[1];
  }
  async getTutor(id: Number) {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http
      .get(`${tutorialUrl}/${id}`, { headers: header })
      .toPromise();
  }

  async createTutorial(data: Tutorial): Promise<any> {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http.post(url, data, { headers: header }).toPromise();
  }

  async updateTutorial(data: Tutorial): Promise<any> {
    return await this.http.put(updateUrl, data).toPromise();
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
  async getAthontication() {
    return await this.http
      .post(authenticate, {
        username: 'javainuse',
        password: 'password',
      })
      .toPromise();
  }
  async getAllComments(id: Number) {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http
      .get(`${commentUrl}/${id}`, { headers: header })
      .toPromise();
  }
  async createComment(data: Comments): Promise<any> {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http
      .post(getcommentUrl, data, { headers: header })
      .toPromise();
  }
  async createUserLogin(user: LoginUser) {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http
      .post(authenticate, user, { headers: header })
      .toPromise();
  }

getStudentData(): Observable<Student[]> {
  return this.http.get<Student[]>(`${getStudentData}`);
}
}

