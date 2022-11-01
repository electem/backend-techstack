import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css']
})
export class CompanylistComponent implements OnInit {
  companies?: Company[] = [];
  constructor(  private userservice: UserService,) { }

  ngOnInit(): void {
    this.retrieveCompany();
  }
  async retrieveCompany(): Promise<void> {
    this.companies = await this.userservice.getallCompany();
  }

}
