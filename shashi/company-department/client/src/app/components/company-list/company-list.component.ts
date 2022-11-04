import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/companyDepartment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  companiesList: Company[] = [];
  page?: number;
  itemsPerPage?: string;
  pagesizes = ['all', 2, 4, 6];
  totalItems?: number;

  constructor(
    private companyService: CompanyService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.retrievecompanies();
  }

  async deleteCompanyById(id: number): Promise<void> {
    await this.companyService.deleteCompanyById(id);
    this.retrievecompanies();
  }

  async retrievecompanies(): Promise<void> {
    this.companiesList = await this.companyService.getCompanies();
  }

  async pagination(page: number): Promise<void> {
    this.http
      .get(
        `http://localhost:3000/company?page=${page}&size=${this.itemsPerPage}`
      )
      .subscribe();
  }

  async handlePageSizeChange(event: Event): Promise<void> {
    this.itemsPerPage = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.retrievecompanies();
  }
}
