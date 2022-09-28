import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { PannelserviceService } from 'src/app/services/pannelservice.service';

@Component({
  selector: 'app-employeerecord',
  templateUrl: './employeerecord.component.html',
  styleUrls: ['./employeerecord.component.css']
})
export class EmployeerecordComponent implements OnInit {
  employees?: Employee[] =[];

  constructor(private PannelserviceService: PannelserviceService) { }

  ngOnInit(): void {
    this. getEmployees();
  }
  async getEmployees(){
    this.employees  = await this.PannelserviceService.getEmployees()
}
}
