import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Department } from 'src/app/models/department.model';
import { CompanyService } from 'src/app/services/companyDepartment.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
})
export class EditCompanyComponent implements OnInit {
  company: Company = {
    companyname: '',
    address: '',
    department: [],
  };

  departmentsList: Department[] = [];
  remainingDepartmentList: Department[] = [];

  currentDepartment?: Department;

  removeDepartment?: Company;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCompanyById(this.route.snapshot.params.id);
    this.retrieveDepartments();
  }
  async getCompanyById(id: number): Promise<void> {
    this.company = await this.companyService.getCompanyById(id);
  }

  async retrieveDepartments(): Promise<void> {
    this.departmentsList = await this.companyService.getDepartments();
  }

  async removeActiveDepartment(department: Department): Promise<void> {
    this.currentDepartment = department;
    this.company.department?.push(this.currentDepartment);
    this.departmentsList.splice(
      this.departmentsList.indexOf(this.currentDepartment),
      1
    );
  }

  async removeSelectedDepartmentFromCompany(
    department: Department
  ): Promise<void> {
    this.removeDepartment = department;
    this.departmentsList.push(this.removeDepartment);
    this.company.department?.splice(
      this.company.department?.indexOf(this.removeDepartment),
      1
    );
  }
  async updateCompany(): Promise<void> {
    const company: Company = {
      id: this.company.id,
      companyname: this.company.companyname,
      address: this.company.address,
      department: this.company.department,
    };
    await this.companyService.updateCompany(company);
  }
}
