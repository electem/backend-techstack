import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Employee } from 'src/app/models/employee';
import { PannelserviceService } from 'src/app/services/pannelservice.service';

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
  companys?: Company[];
  submitted?: boolean;

  constructor(private PannelserviceService: PannelserviceService) {}

  ngOnInit(): void {
    this.getEmployee();
    this.getCompanies();
  }

  getEmployee() {
    this.employee = this.PannelserviceService.getEmployee();
  }

  getCompanies() {
    this.companys = this.PannelserviceService.getCompany();
  }

  async  SaveData(){
    this.submitted = true
   const employee: Employee = {
      name:this.employee.name,
      address: this.employee.address,
      gender: this.employee.gender,
      salary: this.employee.salary,
    };
    await this.PannelserviceService.createEmployee(employee);
  }
}
