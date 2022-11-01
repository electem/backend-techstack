import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Department } from 'src/app/models/department.model';
import { CompanyService } from 'src/app/services/company.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css'],
})
export class CreateDepartmentComponent implements OnInit {
  submitted: boolean = false;
  registerForm!: FormGroup;
  companies: Company[] = [];
  addedCompanies: Company[] = [];
  selectedCompany: Company = {};
  currentDepartment: Department = {
    name: '',
    type: '',
    companies: [],
  };
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.getCompanies();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
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
    this.saveDepartment();
  }

  async getCompanies(): Promise<void> {
    this.companies = await this.companyService.getCompanies();
  }

  onItemSelect(item: any) {
    this.selectedCompany = item;
    this.addedCompanies.push(this.selectedCompany);
  }
  onSelectAll(items: any) {
    this.selectedCompany = items;
    this.addedCompanies.push(this.selectedCompany);
    console.log(this.addedCompanies);
  }

  async saveDepartment(): Promise<void> {
    const department: Department = {
      name: this.currentDepartment.name,
      type: this.currentDepartment.type,
      companies: this.addedCompanies,
    };
    await this.companyService.createDepartment(department);
    this.router.navigate(['/dept-list']);
  }
}
