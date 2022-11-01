import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css']
})
export class CompanylistComponent implements OnInit {
  companies?: Company[] = [];
  constructor(  private userservice: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveCompany();
  }
  async retrieveCompany(): Promise<void> {
    this.companies = await this.userservice.getallCompany();
  }

  click() {
    this.router.navigate(['/create']);
  }

}
