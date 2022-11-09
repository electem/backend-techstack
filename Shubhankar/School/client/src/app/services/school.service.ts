import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { School } from '../models/school';



const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}

  createSchool(data: School): Promise<School> {
    return this.http.post<School>(baseUrl + '/school', data).toPromise();
  }

  async getallSchools(): Promise<School[]> {
    return await this.http.get<School[]>(baseUrl + '/school').toPromise();
  }
}
