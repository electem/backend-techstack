import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Department } from 'src/app/models/department.model';
import { CompanyService } from 'src/app/services/companyDepartment.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css'],
})
export class CreateCompanyComponent implements OnInit {
  createCompanyForm!: FormGroup;
  departmentsList: Department[] = [];
  AdddepartmentsList: Department[] = [];
  currentDepartment!: Department;
  submitted = false;
  company: Company = {
    companyname: '',
    address: '',
    department: [],
  };

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCompanyForm = this.formBuilder.group({
      companyname: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.retrieveDepartments();
  }

  get formValidation() {
    return this.createCompanyForm.controls;
  }

  async retrieveDepartments(): Promise<void> {
    this.departmentsList = await this.companyService.getDepartments();
  }

  async selectedDepartment(department: Department): Promise<void> {
    this.currentDepartment = department;
    this.AdddepartmentsList?.push(this.currentDepartment);
  }
  async saveCompany(): Promise<void> {
    this.submitted = true;
    if (this.createCompanyForm.invalid) {
      return;
    } else {
      this.saveCompanyDetails();
    }
  }
  async saveCompanyDetails(): Promise<void> {
    const companyData: Company = {
      companyname: this.company.companyname,
      address: this.company.address,
      department: this.AdddepartmentsList,
    };
    await this.companyService.createCompany(companyData);
    this.router.navigate(['/companylist']);
  }
}
