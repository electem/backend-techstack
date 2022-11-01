import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Company } from 'src/app/models/company.model';
import { Department } from 'src/app/models/department.model';
import { CompanyService } from 'src/app/services/companyDepartment.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css'],
})
export class CreateDepartmentComponent implements OnInit {
  createDepartmentForm!: FormGroup;
  companiesList: Company[] = [];
  dropdownSettings: IDropdownSettings = {};
  submitted = false;
  department: Department = {
    departmentname: '',
    type: '',
    company: [],
  };
  currentCompany!: Company;
  AddedCompanies: Company[] = [];
  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createDepartmentForm = this.formBuilder.group({
      departmentname: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.retrievecompanies();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'companyname',
    };
  }
  get formValidation() {
    return this.createDepartmentForm.controls;
  }
  async retrievecompanies(): Promise<void> {
    this.companiesList = await this.companyService.getCompanies();
  }

  async selectedCompany(company: Company): Promise<void> {
    this.currentCompany = company;
    this.AddedCompanies?.push(this.currentCompany);
  }

  async onSelectAllCompany(items: Company): Promise<void> {
    this.currentCompany = items;
    this.AddedCompanies?.push(this.currentCompany);
  }

  async saveDepartment(): Promise<void> {
    this.submitted = true;
    if (this.createDepartmentForm.invalid) {
      return;
    } else {
      this.saveDepartmentDetails();
    }
  }

  async saveDepartmentDetails(): Promise<void> {
    const departmentData: Department = {
      departmentname: this.department.departmentname,
      type: this.department.type,
      company: this.AddedCompanies,
    };
    await this.companyService.createDepartment(departmentData);
    this.router.navigate(['/departmentlist']);
  }
}
