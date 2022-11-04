import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Department } from 'src/app/models/depertment';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
})
export class EditCompanyComponent implements OnInit {
  companies: Company[] = [];
  newCompany: Company = {
    name: '',
    address: '',
    email: '',
    departments: [],
  };
  departments: Department[] = [];
  departmentList: Department[] = [];
  selectedDepartment: Department = {};
  removeDepartment: Department = {};

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCompanyId(this.route.snapshot.params.id);
    this.retrieveDepertments();
  }
  private async getCompanyId(id: number) {
    this.newCompany = await this.companyService.getCompanyByID(id);
  }
  async retrieveDepertments(): Promise<void> {
    this.departments = await this.companyService.getDepertments();
    this.departmentList = this.departments;
  }
  async onSelectPushToCurrentDepartment(
    departments: Department
  ): Promise<void> {
    this.selectedDepartment = departments;
    this.newCompany.departments?.push(this.selectedDepartment);
    this.departmentList.splice(
      this.departmentList.indexOf(this.selectedDepartment),
      1
    );
  }
  async onSelectPushToDepartmentList(departments: Department) {
    this.selectedDepartment = departments;
    this.departmentList.push(this.selectedDepartment);
    this.newCompany.departments?.splice(
      this.newCompany.departments?.indexOf(this.selectedDepartment),
      1
    );
  }
  async updateCompany(): Promise<void> {
    const companydata = {
      id: this.newCompany.id,
      name: this.newCompany.name,
      address: this.newCompany.address,
      email: this.newCompany.email,
      depertements: this.newCompany.departments,
    };
    await this.companyService.updateCompany(this.newCompany.id!, companydata);
  }
}
