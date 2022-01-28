import { Component, OnInit } from '@angular/core';
import {EmployeeService} from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[];
  deleteMessage=false; 
  currentEmployee: Employee = {
    employeeId: '',
    firstName: '',
    lastName: '',
    emailId: ''
    
  };
  constructor(private employeeService: EmployeeService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    //get all list of employee
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      console.log(data);
      this.employees = data;
    });
  }
  //delete employee by id
  deleteEmployee(id: number) {  
    this.employeeService.delete(id)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.employeeService.getEmployees().subscribe(data =>{  
            this.employees =data  
            })  
        },  
        error => console.log(error));  
  }  
//update the employee
  updateEmployee(id: number){  
    this.employeeService.getEmployeeById(id)  
      .subscribe(  
        data => {  
          this.currentEmployee=data             
        },  
        error => console.log(error)); 
  }  
}
