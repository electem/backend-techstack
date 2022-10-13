import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { PannelService } from '../../services/pannelservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})

export class EmployeeComponent implements OnInit {

  employee: Employee = {
    name: '',
    address: '',
    gender: '',
    salary: 1,
  };
  
  submitted?: boolean;

  constructor(private http: HttpClient, private pannelservice: PannelService) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.employee = this.pannelservice.getEmployee();
  }

  async  SaveData(){
    this.submitted = true
      const employee: Employee = {
      name:this.employee.name,
      address: this.employee.address,
      gender: this.employee.gender,
      salary: this.employee.salary,
    };
    await this.pannelservice.createEmployee(employee);
  }
}
