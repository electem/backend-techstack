import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
@Component({
  selector: 'app-companylisting',
  templateUrl: './companylisting.component.html',
  styleUrls: ['./companylisting.component.css'],
})
export class CompanylistingComponent implements OnInit {
  companies: Company[] = [];
  constructor(private companyservice: CompanyService) {}

  ngOnInit(): void {
    this.retrieveCompanies();
  }

  async retrieveCompanies(): Promise<void> {
    this.companies = await this.companyservice.getCompanies();
  }
}