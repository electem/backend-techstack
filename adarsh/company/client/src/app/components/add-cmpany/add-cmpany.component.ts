import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Department } from 'src/app/models/depertment';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-add-cmpany',
  templateUrl: './add-cmpany.component.html',
  styleUrls: ['./add-cmpany.component.css'],
})
export class AddCmpanyComponent implements OnInit {
  newCompany: Company = {
    name: '',
    address: '',
    email: '',
    departments: [],
  };
  departments: Department[] = [];
  slectedDepertments: Department[] = [];
  departmentSelected: Department = {};
  registerForm!: FormGroup;
  submitted?: boolean;

  constructor(private companyService: CompanyService, private router: Router, private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      
    });
    this.retrieveDepertments();
  }

  async saveNewCompany(): Promise<void> {
    const newCompanyData = {
      name: this.newCompany.name,
      address: this.newCompany.address,
      email: this.newCompany.email,
      departments: this.newCompany.departments,
    };
    await this.companyService.createNewCompany(newCompanyData);
    this.router.navigate(['/list']);
  }

  async retrieveDepertments(): Promise<void> {
    this.departments = await this.companyService.getDepertments();
  }

  async selectingDepartments(department: Department): Promise<void> {
    this.departmentSelected = department;
    this.slectedDepertments.push(this.departmentSelected);
  }
  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
    this.saveNewCompany();
  }
  get validation() {
    return this.registerForm.controls;
  }
}
