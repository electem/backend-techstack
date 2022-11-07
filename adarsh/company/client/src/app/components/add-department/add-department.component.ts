import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Company } from 'src/app/models/company';
import { Department } from 'src/app/models/depertment';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent implements OnInit {
  newDepartment: Department = {
    name: '',
    companies: [],
  };
  companies: Company[] = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems = [];
  addnewCompanies: Company[] = [];
  selectedCompany: Company = {};
  registerForm!: FormGroup;
  submitted?: boolean;

  constructor(private companyService: CompanyService, private router: Router,private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      
      
    });
    this.retrieveCompanys();
  }
  async saveNewdepartment(): Promise<void> {
    const department: Department = {
      name: this.newDepartment.name,
      companies: this.addnewCompanies,
    };
    await this.companyService.createNewDepartmement(department);
  }
  async retrieveCompanys() {
    this.companies = await this.companyService.getCompanys();
  }
  onItemSelect(item: any) {
    this.selectedCompany = item;
    this.addnewCompanies.push(this.selectedCompany);
  }
  onSelectAll(items: any) {
    this.selectedCompany = items;
    this.addnewCompanies.push(this.selectedCompany);
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
    this.saveNewdepartment();
  }
}
