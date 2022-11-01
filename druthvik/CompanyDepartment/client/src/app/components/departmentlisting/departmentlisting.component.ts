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
  constructor(private departmentservice: DepartmentService) {}

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
}
