import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Company } from 'src/app/models/company.model';
import { Department } from 'src/app/models/department.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
})
export class EditDepartmentComponent implements OnInit {
  companies: Company[] = [];
  selectedItems = [];
  addedCompanies: Company[] = [];
  selectedCompany: Company = {};
  dropdownSettings: IDropdownSettings = {};
  currentDepartment: Department = {
    name: '',
    type: '',
    companies: [],
  };
  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    this.getDepartmentById(this.route.snapshot.params.id);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
  }

  async getCompanies(): Promise<void> {
    this.companies = await this.companyService.getCompanies();
  }

  async getDepartmentById(id: number) {
    this.currentDepartment = await this.companyService.getDepartmentById(id);
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

  async updateDepartment(): Promise<void> {
    const department: Department = {
      id: this.currentDepartment.id,
      name: this.currentDepartment.name,
      type: this.currentDepartment.type,
      companies: this.currentDepartment.companies,
    };
    await this.companyService.updateDepartment(
      this.currentDepartment.id!,
      department
    );
    this.router.navigate(['/dept-list']);
  }
}
