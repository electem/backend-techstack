import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '@app/models/employee.model';
import { Observable } from 'rxjs';

const  baseUrl = 'http://localhost:8080/api/employee';
const baseUrlSave = 'http://localhost:8080/api/save/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private  baseUrl = 'http://localhost:8080/api/employee';
  constructor(private http: HttpClient) { }

  //List of Employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}`);
  }

  //Delete employye by Id
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  //update employee
  updateEmployee(id: number, value: any): Observable<Object> {  
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }  

 //get employee by id
  getEmployeeById(id: number): Observable<Object> {  
    return this.http.get(`${this.baseUrl}/${id}`);  
  } 

  //save employee
  create(data: any): Observable<any> {
    return this.http.post(baseUrlSave, data);
  }
}
