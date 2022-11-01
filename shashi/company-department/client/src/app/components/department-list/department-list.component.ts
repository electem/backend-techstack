import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/companyDepartment.service';
import { Department } from 'src/app/models/department.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  departmentsList: Department[] = [];
  page?: number;
  itemsPerPage?: string;
  pagesizes = ['all', 2, 4, 6];
  totalItems?: number;

  constructor(
    private companyService: CompanyService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.retrieveDepartments();
  }

  async retrieveDepartments(): Promise<void> {
    this.departmentsList = await this.companyService.getDepartments();
  }

  async deleteDepartmentById(id: number): Promise<void> {
    await this.companyService.deleteDepartmentById(id);
  }

  async pagination(page: number): Promise<void> {
    this.http
      .get(
        `http://localhost:3000/department?page=${page}&size=${this.itemsPerPage}`
      )
      .subscribe();
  }

  async handlePageSizeChange(event: Event): Promise<void> {
    this.itemsPerPage = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.retrieveDepartments();
  }
}
