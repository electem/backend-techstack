import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  async getCompanies(): Promise<void> {
    this.companies = await this.companyService.getCompanies();
  }

  async deleteCompany(id: number): Promise<void> {
    var delBtn = confirm(' Do you want to delete ?');
    await this.companyService.deleteCompany(id);
    this.router.navigate(['/company-list']);
  }
}
