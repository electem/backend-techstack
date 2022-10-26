import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/companyDepartment.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  companiesList: Company[] = [];

  constructor(private customerService: CompanyService) {}

  ngOnInit(): void {
    this.retrievecompanies();
  }
  async retrievecompanies(): Promise<void> {
    this.companiesList = await this.customerService.getCompanies();
  }
}
