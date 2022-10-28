import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.css'],
})
export class EditcompanyComponent implements OnInit {
  company: Company = {
    name: '',
    address: '',
    department: [],
  };
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.getCompanyById(this.route.snapshot.params.id);
  }

  async getCompanyById(id: number) {
    this.company = await this.companyService.getCompanyById(id);
  }
}
