import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company} from 'src/app/models/company';
import { Employee } from 'src/app/models/employee';
import { PannelserviceService } from 'src/app/services/pannelservice.service';
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
  

  constructor(private PannelserviceService: PannelserviceService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.Employeeform = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      salary: ['', Validators.required],
    })
    this.getEmployee();
  }
getEmployee() {
    this.employee = this.PannelserviceService.getEmployee();
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
    await this.PannelserviceService.createEmployee(employee);
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