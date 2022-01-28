import { Component, OnInit } from '@angular/core';
import { Employee } from '@app/models/employee.model';
import {EmployeeService} from 'src/app/services/employee.service';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.less']
})
export class EditEmployeeComponent implements OnInit {
  employees: Employee[];
  submitted = false;
  employee: Employee = {
    employeeId: '',
    firstName: '',
    lastName: '',
    emailId: ''
  };
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    
  }
  saveEmployee(): void {
    const data = {
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      emailId: this.employee.emailId
    };

    this.employeeService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

}
