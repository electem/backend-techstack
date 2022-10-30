import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Company } from 'src/app/models/company';
import { Department } from 'src/app/models/department';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createdepartment',
  templateUrl: './createdepartment.component.html',
  styleUrls: ['./createdepartment.component.css'],
})
export class CreatedepartmentComponent implements OnInit {
  createDepartment!: FormGroup;
  submitted: boolean = false;
  depertment: Department = {
    name: '',
    type: '',
    company: [],
  };
  companies: Company[] = [];
  dropdownSettings: IDropdownSettings = {};
  currentCompany!: Company;
  AddedCompanies: Company[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createDepartment = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.retrievecompanies();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
  }
  get fval() {
    return this.createDepartment.controls;
  }
  async signup() {
    this.submitted = true;
    if (this.createDepartment.invalid) {
      return;
    }
  }

  async retrievecompanies(): Promise<void> {
    this.companies = await this.userService.getCompany();
  }

  async selectedCompany(company: any): Promise<void> {
    this.currentCompany = company;
    this.AddedCompanies?.push(this.currentCompany);
  }

  async onSelectAllCompany(company: any): Promise<void> {
    this.currentCompany = company;
    this.AddedCompanies?.push(this.currentCompany);
  }

  async getSubmit() {
    this.submitted = true;
    const departmentinfo: Department = {
      name: this.depertment.name,
      type: this.depertment.type,
      company: this.AddedCompanies,
    };
    await this.userService.createdepartment(departmentinfo);
    this.router.navigate(['/departmentlist']);
  }
}
