import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Department } from 'src/app/models/department';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.css'],
})
export class CreatecompanyComponent implements OnInit {
  createCompany!: FormGroup;
  department: Department[] = [];
  submitted: boolean = false;
  removeDepartmentFromList?: Department = {};
  extraDepartment: Department[] = [];
  company: Company = {
    name: '',
    department: '',
    address: '',
    departments:[],
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createCompany = this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.retrieveDepartment();
  }

  async retrieveDepartment(): Promise<void> {
    this.department = await this.userService.getallDepartment();
  }
  public onSelectPushExtraPlayerToPlayersList(department: Department) {
    this.removeDepartmentFromList = department;
    this.company.departments?.push();
    this.extraDepartment.splice(
      this.extraDepartment.indexOf(this.removeDepartmentFromList!),
      1
    );
  }


   get fval() {
    return this.createCompany.controls;
  }
  async signup() {
    this.submitted = true;
    if (this.createCompany.invalid) {
      return;
    }
  }

  async getSubmit() {
    this.submitted = true;
    const companyinfo: Company = {
      name: this.company.name,
      department: this.company.department,
      address: this.company.address,
      departments:this.company.departments,
    };
    await this.userService.createcompany(companyinfo);
    this.router.navigate(['/company']);
  }


}
