import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { CompanyService } from 'src/app/services/companyDepartment.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
})
export class EditDepartmentComponent implements OnInit {
  department: Department = {
    departmentname: '',
    type: '',
    company: [],
  };
  companiesList: Company[] = [];

  dropdownSettings: IDropdownSettings = {};

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDepartmentById(this.route.snapshot.params.id);
    this.dropdownSettings = {
      idField: 'id',
      textField: 'companyname',
    };
    this.retrievecompanies();
  }

  async getDepartmentById(id: number): Promise<void> {
    this.department = await this.companyService.getDepartmentById(id);
  }
  async retrievecompanies(): Promise<void> {
    this.companiesList = await this.companyService.getCompanies();
  }

  async updateDepartment(): Promise<void> {
    const department: Department = {
      id: this.department.id,
      departmentname: this.department.departmentname,
      type: this.department.type,
      company: this.department.company,
    };
    await this.companyService.updateDepartment(department);
  }
}
