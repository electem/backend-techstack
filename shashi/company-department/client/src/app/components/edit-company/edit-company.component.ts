import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/companyDepartment.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
})
export class EditCompanyComponent implements OnInit {
  company: Company = {
    companyname: '',
    address: '',
    department: [],
  };

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCompanyById(this.route.snapshot.params.id);
  }
  async getCompanyById(id: number): Promise<void> {
    this.company = await this.companyService.getCompanyById(id);
  }
  // async updateCustomer(): Promise<void> {
  //   const customer: Company = {
  //     id: this.company.id,
  //     companyname: this.company.companyname,
  //     address: this.company.address,
  //   };
  //   await this.customerService.updateCustomer(customer);
  // }
}
