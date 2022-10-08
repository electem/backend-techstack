import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { PannelService } from '../../services/pannelservice.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company?: Company[];
  

  constructor(private pannelService: PannelService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.company = this.pannelService.getCompany();
  }

}
