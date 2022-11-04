import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/depertment';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-department-listing',
  templateUrl: './department-listing.component.html',
  styleUrls: ['./department-listing.component.css']
})
export class DepartmentListingComponent implements OnInit {
  departments: Department[] = [];
  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveDepartments();

  }

  async retrieveDepartments() {
    this.departments = await this.companyService. getDepertments();
   
  }
}
