import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.css'],
})
export class DepartmentlistComponent implements OnInit {
  departments: Department[] = [];
  page = 3;
  itemsPerPage? = 2;
  totalItems?: string;
  pageSizes = [3, 6, 9];
  constructor(
    private userservice: UserService,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.retrieveDepartment();
  }

  async retrieveDepartment(): Promise<void> {
    this.departments = await this.userservice.getallDepartment();
  }

  handlepageChange(page: number) {
    this.http
      .get(
        `http://localhost:3000/department?page=${page}&size=${this.itemsPerPage}`
      )
      .subscribe();
  }

  handlePageSizeChange(event: any) {
    this.itemsPerPage = event.target.value;
    this.page = 1;
    this.retrieveDepartment();
  }

  click() {
    this.router.navigate(['/dept']);
  }

  logout(): void {
    this.auth.signOut();
  }
}
