import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/companyDepartment.service';
import { Department } from 'src/app/models/department.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  departmentsList: Department[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.retrieveDepartments();
  }
  async retrieveDepartments(): Promise<void> {
    this.departmentsList = await this.companyService.getDepartments();
  }
}
