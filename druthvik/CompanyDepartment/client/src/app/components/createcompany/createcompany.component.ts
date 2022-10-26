import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.css'],
})
export class CreatecompanyComponent implements OnInit {
  createcompanyForm: FormGroup;
  submitted = false;
  createcompany: Company = {
    name: '',
    address: '',
  };
  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createcompanyForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  get f() {
    return this.createcompanyForm.controls;
  }
  async createCompanyValidate(): Promise<void> {
    this.submitted = true;
    if (this.createcompanyForm.invalid) {
      return;
    } else {
      this.createCompany();
    }
  }
  async createCompany(): Promise<void> {
    const createCompany: Company = {
      name: this.createcompany.name,
      address: this.createcompany.address,
    };
    await this.companyService.createCompany(createCompany);
  }
}
