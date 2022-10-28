import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../../models/company.model';
import { Department } from '../../models/department.model';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css'],
})
export class CreateCompanyComponent implements OnInit {
  submitted: boolean = false;
  registerForm!: FormGroup;
  departments: Department[] = [];
  addedDepartments: Department[] = [];
  currentDepartment?: Department = {};
  currentCompany: Company = {
    name: '',
    address: '',
    email: '',
    departments: [],
  };

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
    });
  }

  get validation() {
    return this.registerForm.controls;
  }

  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
    this.saveCompany();
  }

  async onSelectingDepartment(department: Department): Promise<void> {
    this.currentDepartment = department;
    this.addedDepartments?.push(this.currentDepartment);
  }

  async saveCompany(): Promise<void> {
    const company: Company = {
      name: this.currentCompany.name,
      address: this.currentCompany.address,
      email: this.currentCompany.email,
      phoneNo: this.currentCompany.phoneNo,
      departments: this.addedDepartments,
    };
    await this.companyService.createCompany(company);
    this.router.navigate(['/company-list']);
  }
}
