import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  file = File;
  constructor(private http: HttpClient) {}
}
