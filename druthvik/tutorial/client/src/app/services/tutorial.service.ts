import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tutorial } from '../models/tutorial.model';
import { Category } from '../models/category.model';
import { Comment } from '../models/comment.model';
const baseUrl = 'http://localhost:8000/tutorial';
const baseUrl1 = 'http://localhost:8000/category';
const baseUrl2 = 'http://localhost:8000/comments';
const baseUrl3 = 'http://localhost:8000/userlogin';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private roles = [{ name: 'author' }, { name: 'comment' }];
  constructor(private http: HttpClient) {}

  getRoles() {
    return this.roles;
  }

  async getAll(): Promise<Tutorial[]> {
    return await this.http.get<Tutorial[]>(baseUrl).toPromise();
  }

  async getAllCategory(): Promise<Category[]> {
    return await this.http.get<Category[]>(baseUrl1).toPromise();
  }

  async getCategoryById(id: any): Promise<Category[]> {
    return await this.http.get<Category[]>(baseUrl1).toPromise();
  }

  async getbyId(id: number) {
    return await this.http.get(`${baseUrl}/${id}`).toPromise();
  }
  async getTutor(id: Number): Promise<Tutorial> {
    return await this.http.get(`${baseUrl}/${id}`).toPromise();
  }

  async createTutorial(data: any): Promise<Tutorial[]> {
    return await this.http.post<Category[]>(baseUrl, data).toPromise();
  }

  async createCategory(data: any): Promise<Category[]> {
    return await this.http.post<Category[]>(baseUrl1, data).toPromise();
  }
  async update(data: any) {
    return this.http.put(baseUrl, data).toPromise();
  }

  deletebyid(id: any) {
    return this.http.delete(`${baseUrl}/${id}`).toPromise();
  }

  deleteAll() {
    return this.http.delete(baseUrl).toPromise();
  }

  filterByTitle(title: any) {
    return this.http.get<Tutorial>(`${baseUrl}?title=${title}`).toPromise();
  }

  async getAllComments(): Promise<Comment[]> {
    return await this.http.get<Comment[]>(baseUrl2).toPromise();
  }
  async createComment(data: any): Promise<Comment[]> {
    return await this.http.post<Comment[]>(baseUrl2, data).toPromise();
  }

  async getCommentByTutorial(id: Number) {
    return await this.http.get(`${baseUrl2}/${id}`).toPromise();
  }

  async getUserById(id: Number) {
    return await this.http.get(`${baseUrl3}/${id}`).toPromise();
  }
}
