import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Company } from 'src/app/models/company';
import { Department } from 'src/app/models/depertment';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
})
export class EditDepartmentComponent implements OnInit {
  newDepartment: Department = {
    name: '',
    companies: [],
  };
  companies: Company[] = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems = [];
  addedCompanies: Company[] = [];
  selectedCompany: Company = {};

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDepartmentId(this.route.snapshot.params.id);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.retrieveCompany();
  }

  private async getDepartmentId(id: number) {
    this.newDepartment = await this.companyService.getDepartmentByID(id);
  }
  async retrieveCompany(): Promise<void> {
    this.companies = await this.companyService.getCompanys();
  }
  onItemSelect(item: any) {
    this.selectedCompany = item;
    this.addedCompanies.push(this.selectedCompany);
  }
  onSelectAll(items: any) {
    this.selectedCompany = items;
    this.addedCompanies.push(this.selectedCompany);
  }

  async updateDepartment(): Promise<void> {
    const department: Department = {
      id: this.newDepartment.id,
      name: this.newDepartment.name,
      companies: this.newDepartment.companies,
    };
    await this.companyService.updateDepartment(
      this.newDepartment.id!,
      department
    );
  }
}
