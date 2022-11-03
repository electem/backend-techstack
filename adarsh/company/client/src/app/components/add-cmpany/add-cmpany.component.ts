import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Department } from 'src/app/models/depertment';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-add-cmpany',
  templateUrl: './add-cmpany.component.html',
  styleUrls: ['./add-cmpany.component.css'],
})
export class AddCmpanyComponent implements OnInit {
  newCompany: Company = {
    name: '',
    address: '',
    email: '',
    departments: [],
  };
  departments: Department[] = [];
  slectedDepertments: Department[] = [];
  departmentSelected: Department = {};

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveDepertments();
  }

  async saveNewCompany(): Promise<void> {
    const newCompanyData = {
      name: this.newCompany.name,
      address: this.newCompany.address,
      email: this.newCompany.email,
      departments: this.newCompany.departments,
    };
    await this.companyService.createNewCompany(newCompanyData);
  }

  async retrieveDepertments(): Promise<void> {
    this.departments = await this.companyService.getDepertments();
  }

  async selectingDepartments(department: Department): Promise<void> {
    this.departmentSelected = department;
    this.slectedDepertments.push(this.departmentSelected);
  }
}
