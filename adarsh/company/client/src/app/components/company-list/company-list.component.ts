import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyLIstComponent implements OnInit {
  companys: Company[] = [];

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveCompanys();
  }
  async retrieveCompanys() {
    this.companys = await this.companyService. getCompanys();
   
  }
}
