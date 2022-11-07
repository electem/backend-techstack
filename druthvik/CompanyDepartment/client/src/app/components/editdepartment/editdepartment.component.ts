import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from '../../services/department.service';
import { Company } from '../../models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-editdepartment',
  templateUrl: './editdepartment.component.html',
  styleUrls: ['./editdepartment.component.css'],
})
export class EditdepartmentComponent implements OnInit {
  department: Department = {
    name: '',
    type: '',
    company: [],
  };
  selectedItems: Company[] = [];
  companies: Company[] = [];
  dropdownSettings: IDropdownSettings = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.getDepartmentById(this.route.snapshot.params.id);
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
    this.selectedItems = this.department.company;
    this.retrieveCompanies();
  }

  async getDepartmentById(id: number) {
    this.department = await this.departmentService.getDepartmentById(id);
  }

  async updateDepartment(): Promise<void> {
    const department: Department = {
      id: this.department.id,
      name: this.department.name,
      type: this.department.type,
      company: this.department.company,
    };
    await this.departmentService.updateDepartment(department);
    this.router.navigate(['/departmentlisting']);
  }
  async retrieveCompanies(): Promise<void> {
    this.companies = await this.companyService.getCompanies();
  }
  cancel() {
    this.router.navigate(['/companylisting']);
  }
}
