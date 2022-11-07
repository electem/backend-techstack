import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Company } from '../../models/company';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css'],
})
export class CompanylistComponent implements OnInit {
  companies?: Company[] = [];
  company: Company[] = [];
  page = 3;
  itemsPerPage? = 2;
  totalItems?: number;
  pageSizes = [3, 6, 9];
  constructor(
    private userservice: UserService,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.retrieveCompany();
  }

  async retrieveCompany() {
    this.company = await this.userservice.getCompany();
    console.log(this.company);
  }
  handlepageChange(page: number) {
    this.http
      .get(
        `http://localhost:3000/company?page=${page}&size=${this.itemsPerPage}`
      )
      .subscribe();
  }

  handlePageSizeChange(event: any) {
    this.itemsPerPage = event.target.value;
    this.page = 1;
    this.retrieveCompany();
  }

  click() {
    this.router.navigate(['/create']);
  }

  logout(): void {
    this.auth.signOut();
  }
}
