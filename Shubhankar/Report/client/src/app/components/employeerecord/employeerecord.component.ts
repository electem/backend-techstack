import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { PannelService } from '../../services/pannelservice.service';

@Component({
  selector: 'app-employeerecord',
  templateUrl: './employeerecord.component.html',
  styleUrls: ['./employeerecord.component.css']
})
export class EmployeerecordComponent implements OnInit {
  employees?: Employee[] =[];

  constructor(private pannelService: PannelService) { }

  ngOnInit(): void {
    this. getEmployees();
  }
  
  async getEmployees(){
    this.employees  = await this.pannelService.getEmployees()
}
}
