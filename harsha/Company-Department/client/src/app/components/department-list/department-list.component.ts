import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  async getDepartments(): Promise<void> {
    this.departments = await this.companyService.getDepartments();
  }
}
