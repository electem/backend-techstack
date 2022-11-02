import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-companylisting',
  templateUrl: './companylisting.component.html',
  styleUrls: ['./companylisting.component.css'],
})
export class CompanylistingComponent implements OnInit {
  companies: Company[];
  page: number;
  count: number = 3;
  totalItems: any;
  pageSizes = [3, 6, 9];
  filteredItems: Company[];
  searchText: string;
  mailcompany: Company = {
    name: '',
    address: '',
    department: [],
  };
  constructor(
    private companyservice: CompanyService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.retrieveCompanies();
  }

  async retrieveCompanies(): Promise<void> {
    this.companies = await this.companyservice.getCompanies();
  }

  async deletebyid(id: number) {
    await this.companyservice.deletCompanyById(id);
    this.retrieveCompanies();
  }
  pagination(page: any) {
    this.http
      .get(`http://localhost:3000/company?page=${page}&size=${this.count}`)
      .toPromise();
  }

  handlePageSizeChange(event) {
    this.count = event.target.value;
    this.page = 1;
    this.retrieveCompanies();
  }

  async sendmails(id: number): Promise<void> {
    this.mailcompany = await this.companyservice.sendmail(id);
  }

  async sendmailwithattachement(id: number): Promise<void> {
    await this.companyservice.sendmailwithattachement(id);
  }
}
