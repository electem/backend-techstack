import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { DepartmentService } from 'src/app/services/department.service';
@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.css'],
})
export class EditcompanyComponent implements OnInit {
  company: Company = {
    name: '',
    address: '',
    department: [],
  };
  departments: Department[] = [];
  currentDepartment: Department;
  removeDepartment: Department;
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router,
    private departmentService: DepartmentService,
  ) {}

  ngOnInit(): void {
    this.getCompanyById(this.route.snapshot.params.id);
    this.retrieveDepartments();
  }

  async getCompanyById(id: number) {
    this.company = await this.companyService.getCompanyById(id);
  }

  async updateCompany(): Promise<void> {
    const company: Company = {
      id: this.company.id,
      name: this.company.name,
      address: this.company.address,
      department: this.company.department,
    };
    await this.companyService.updateCompany(company);
    this.router.navigate(['/companylisting']);
  }

  async retrieveDepartments(): Promise<void> {
    this.departments = await this.departmentService.getDepartments();
  }
  async removeActiveDepartment(department: Department): Promise<void> {
    this.currentDepartment = department;
    this.company.department?.push(this.currentDepartment);
    this.departments.splice(
      this.departments.indexOf(this.currentDepartment),
      1,
    );
  }
  async removeSelectedDepartmentFromCompany(
    department: Department,
  ): Promise<void> {
    this.removeDepartment = department;
    this.departments.push(this.removeDepartment);
    this.company.department?.splice(
      this.company.department?.indexOf(this.removeDepartment),
      1,
    );
  }
}
