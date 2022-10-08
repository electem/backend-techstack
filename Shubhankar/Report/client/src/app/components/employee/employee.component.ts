import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company} from '../../models/company';
import { Employee } from '../../models/employee';
import { PannelService } from '../../services/pannelservice.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  Employeeform!: FormGroup;
  employee: Employee = {
    name: '',
    address: '',
    gender: '',
    salary: 1,
  };
  companys?: Company[];
  submitted?: boolean;
  employees?: Employee[] =[];
  
  constructor(private pannelService: PannelService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.Employeeform = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      salary: ['', Validators.required],
    })
    this.getEmployee();
  }

 getEmployee() {
    this.employee = this.pannelService.getEmployee();
  }
  async  SaveData(){
    this.submitted = true
    if(this.Employeeform.invalid){
      return
    }else{
      this.SaveFormdata();
    }
  }
  async SaveFormdata(){
    const employee: Employee = {
      name:this.employee.name,
      address: this.employee.address,
      gender: this.employee.gender,
      salary: this.employee.salary,
    };
    await this.pannelService.createEmployee(employee);
  }
  
  get fval() {
    return this.Employeeform.controls;
  }

  async signup(){
    this.submitted = true;
    if (this.Employeeform.invalid) {
    return;
    }
    
    }
}