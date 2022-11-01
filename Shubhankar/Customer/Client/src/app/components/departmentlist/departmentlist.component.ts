import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.css'],
})
export class DepartmentlistComponent implements OnInit {
  departments?: Department[] = [];
  constructor(private userservice: UserService) {}

  ngOnInit(): void {
    this.retrieveDepartment();
  }

  async retrieveDepartment(): Promise<void> {
    this.departments = await this.userservice.getallDepartment();
  }
}
