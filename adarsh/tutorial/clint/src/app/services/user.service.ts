import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
const baseUrl = 'http://localhost:8080/api/tutorials'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data)
  }
  fetchAllUsers(): Observable<any> {
    return this.http.get<any>(baseUrl)
  }
}
