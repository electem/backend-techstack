import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { PannelserviceService } from 'src/app/services/pannelservice.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companys?: Company[];
  

  constructor(private PannelserviceService: PannelserviceService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.companys = this.PannelserviceService.getCompany();
  }

}
