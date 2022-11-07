import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departmentlisting',
  templateUrl: './departmentlisting.component.html',
  styleUrls: ['./departmentlisting.component.css'],
})
export class DepartmentlistingComponent implements OnInit {
  departments: Department[] = [];
  page: number;
  count: number = 3;
  totalItems: number;
  pageSizes = [3, 6, 9];
  constructor(
    private departmentservice: DepartmentService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.retrieveDepartments();
  }

  async retrieveDepartments(): Promise<void> {
    this.departments = await this.departmentservice.getDepartments();
  }

  async deletebyid(id: number) {
    await this.departmentservice.deleteDepartmentById(id);
    this.retrieveDepartments();
  }
  pagination(page: any) {
    this.http
      .get(`http://localhost:3000/department?page=${page}&size=${this.count}`)
      .toPromise();
  }
  handlePageSizeChange(event) {
    this.count = event.target.value;
    this.page = 1;
    this.retrieveDepartments();
  }
}
