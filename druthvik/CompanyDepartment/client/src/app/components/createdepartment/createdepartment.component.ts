import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Company } from 'src/app/models/company.model';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-createdepartment',
  templateUrl: './createdepartment.component.html',
  styleUrls: ['./createdepartment.component.css'],
})
export class CreatedepartmentComponent implements OnInit {
  createdepartmentForm: FormGroup;
  submitted = false;
  createdepartment: Department = {
    name: '',
    type: '',
    company: [],
  };
  currentCompany = new Company();
  AddedCompanies: Company[] = [];
  companies: Company[] = [];
  requiredField: boolean = false;
  dropdownSettings: IDropdownSettings = {};
  constructor(
    private departmentservice: DepartmentService,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.createdepartmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      //company: ['', Validators.required],
    });
    this.retrieveCompanies();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
  }
  async retrieveCompanies(): Promise<void> {
    this.companies = await this.companyService.getCompanies();
  }
  get f() {
    return this.createdepartmentForm.controls;
  }
  async createDepartmentValidate(): Promise<void> {
    this.submitted = true;
    if (this.createdepartmentForm.invalid) {
      return;
    } else {
      this.createDepartment();
    }
  }
  async createDepartment(): Promise<void> {
    const createDepartment: Department = {
      name: this.createdepartment.name,
      type: this.createdepartment.type,
      company: this.AddedCompanies,
    };
    await this.departmentservice.createDepartment(createDepartment);
  }

  onSelectCompany(company: Company) {
    this.currentCompany = company;
    this.AddedCompanies?.push(this.currentCompany);
  }

  public onSelectAllCompanies(companies: Company) {
    this.currentCompany = companies;
    this.AddedCompanies?.push(this.currentCompany);
  }
}
