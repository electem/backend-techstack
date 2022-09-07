import { Component, Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Tutorial } from '../models/tutorial.model'
import { Category } from '../models/category.model'
import { Comments } from '../models/comment.model'

const baseUrl = 'http://localhost:8080/api/tutorials'
const tutorialUrl= 'http://localhost:8080/tutorials'
const categoryUrl='http://localhost:8080/categories'
const url='http://localhost:8080/addTutorials'
const updateUrl='http://localhost:8080/updateTutorials'
const authenticate = 'http://localhost:8080/authenticate';
const commentUrl='http://localhost:8080/addComments';
const commentUrlGet='http://localhost:8080/comments/tutorials';

@Injectable({
  providedIn: 'root',
})

export class TutorialService {
  tokenIs!: string;
  tutorial :Tutorial[] = []

  constructor(private http: HttpClient) {}

  private countries= [
    { "name": "India"} ,
    { "name": "England"} ,
    { "name": "Brazil"} ,
    { "name": "Italy"} ,
    { "name": "Germany"} 
  ] ;
  
getCountriesData(){
  return this.countries;
}

  async getCategories(): Promise<Category[]> {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http.get<Category[]>(categoryUrl,{ headers:header}).toPromise();
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
    return this.http.get<String[]>(`${tutorialUrl}`)
  }

  getData(){
    return "data is fetched";
  }

  get(id: any) {
    const index = this.tutorial.findIndex(u => id == u.id);
    return this.tutorial[1]
  }

  async getTutor(id: Number) {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http.get(`${tutorialUrl}/${id}`,{ headers: header }).toPromise();
  }

  async createTutorial(data: Tutorial): Promise<any> {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http
      .post(url,data,{ headers: header })
      .toPromise();
  }

  async updateTutorial(data: Tutorial): Promise<any> {
    return await this.http.put(updateUrl, data).toPromise();
  }
  
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data)
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`)
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl)
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`)
  }

  async getAthontication() {
    return await this.http
      .post(authenticate, {
        username: 'javainuse',
        password: 'password',
      }).toPromise();
  }
  
  async createComment(data: Comments): Promise<any> {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http
      .post(commentUrl,data,{ headers: header })
      .toPromise();
  }

  async getAllCommentsBasedOnTutorilID(id: Number) {
    this.tokenIs = localStorage.getItem('id_token')!;
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenIs
    );
    return await this.http.get(`${commentUrlGet}/${id}`,{ headers: header }).toPromise();
  }
}