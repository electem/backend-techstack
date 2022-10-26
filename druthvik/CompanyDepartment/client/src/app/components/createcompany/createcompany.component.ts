import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from '../../models/department.model';
@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.css'],
})
export class CreatecompanyComponent implements OnInit {
  createcompanyForm: FormGroup;
  submitted = false;
  createcompany: Company = {
    name: '',
    address: '',
  };
  departmentlist: Department[] = [];
  currentDepartment = new Department();
  AdddepartmentsList: Department[] = [];
  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private departmentservice: DepartmentService,
  ) {}

  ngOnInit(): void {
    this.createcompanyForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.retrieveDepartments();
  }
  get f() {
    return this.createcompanyForm.controls;
  }
  async createCompanyValidate(): Promise<void> {
    this.submitted = true;
    if (this.createcompanyForm.invalid) {
      return;
    } else {
      this.createCompany();
    }
  }
  async createCompany(): Promise<void> {
    const createCompany: Company = {
      name: this.createcompany.name,
      address: this.createcompany.address,
    };
    await this.companyService.createCompany(createCompany);
  }
  async retrieveDepartments(): Promise<void> {
    this.departmentlist = await this.departmentservice.getDepartments();
  }

  async selectedDepartment(department: Department): Promise<void> {
    this.currentDepartment = department;

    this.AdddepartmentsList?.push(this.currentDepartment);
  }
}
