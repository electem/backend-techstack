import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class CouserService {
  baseUrl = 'http://localhost:8080/api/tutorials'
  constructor(private http: HttpClient) {}
  save(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data)
  }
  getAllCourcelist(): Observable<any> {
    return this.http.get(this.baseUrl)
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data)
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
