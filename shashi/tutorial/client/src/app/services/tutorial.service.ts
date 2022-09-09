import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tutorial } from '../models/tutorial.model';
import { Category } from '../models/categoryTask.model';
import { Userlogin } from '../models/userlogin.model';
import { Comment } from '../models/comment.model';

const baseUrl = 'http://localhost:8000/tutorials';
const baseUrl2 = 'http://localhost:8000/category';
const baseUrl3 = 'http://localhost:8000/comments';
const baseUrl4 = 'http://localhost:8000/login';

export class Role {
  name?: string;
}

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

  private roles: Role[] = [{ name: 'author' }, { name: 'comment' }];
  constructor(private http: HttpClient) {}

  getCountryFromData() {
    return this.Countrys;
  }
  getRoles() {
    return this.roles;
  }

  async getAll(): Promise<Tutorial[]> {
    return await this.http.get<Tutorial[]>(baseUrl).toPromise();
  }

  async getAllCategory() {
    return await this.http.get<Category[]>(baseUrl2).toPromise();
  }

  createTutorial(data: Tutorial) {
    return this.http.post(baseUrl, data).toPromise();
  }

  updateTutorial(data: Tutorial) {
    return this.http.put(baseUrl, data).toPromise();
  }

  async getTutorial(id: Number): Promise<Tutorial> {
    return await this.http.get(`${baseUrl}/${id}`).toPromise();
  }

  //This method is used to create the Comment
  createComment(comment: Comment) {
    return this.http.post(baseUrl3, comment).toPromise();
  }
  async getCommentByTutorialId(tutorialId: Number) {
    return await this.http.get(`${baseUrl3}/${tutorialId}`).toPromise();
  }

  //userlogin
  createUserlogin(user: Userlogin) {
    return this.http.post(baseUrl4, user).toPromise();
  }
}
