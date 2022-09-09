import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tutorial } from '../models/tutorial.model';
import { Category } from '../models/categoryTask.model';

const baseUrl = 'http://localhost:8000/tutorials';
const baseUrl2 = 'http://localhost:8000/category';
const baseUrl3 = 'http://localhost:8000/comments';
const baseUrl4 = 'http://localhost:8000/login';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  tutorials!: Tutorial[];
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  private Countrys = [{ name: 'qq' }, { name: 'www' }];
  private categorysLocal = [
    {
      id: 1,
      title: 'java',
    },
    { id: 2, title: 'corejava' },
    { id: 3, title: 'Angular' },
  ];

  private Roles = [{ name: 'author' }, { name: 'comment' }];
  constructor(private http: HttpClient) {}

  getCountryFromData() {
    return this.Countrys;
  }
  getRoles() {
    return this.Roles;
  }

  async getAll(): Promise<Tutorial[]> {
    return await this.http.get<Tutorial[]>(baseUrl).toPromise();
  }

  // async getAllCategory(): Promise<Category[]> {
  //   // return await this.http.get<Category[]>(baseUrl2).toPromise();
  //   return this.categorysLocal;
  // }
  async getAllCategory() {
    return await this.http.get<Category[]>(baseUrl2).toPromise();
    //return this.categorysLocal;
  }

  createTutorial(data: any) {
    return this.http.post(baseUrl, data).toPromise();
  }

  updateTutorial(data: any) {
    return this.http.put(baseUrl, data).toPromise();
  }

  async getTutorial(id: Number): Promise<Tutorial> {
    return await this.http.get(`${baseUrl}/${id}`).toPromise();
  }

  //comment
  createComment(data: any) {
    return this.http.post(baseUrl3, data).toPromise();
  }
  async getCommentByTutorialId(tutorialId: Number) {
    return await this.http.get(`${baseUrl3}/${tutorialId}`).toPromise();
  }

  createUserlogin(data: any) {
    return this.http.post(baseUrl4, data).toPromise();
  }
  async getUserloginById(id: Number) {
    return await this.http.get(`${baseUrl4}/${id}`).toPromise();
  }
}
