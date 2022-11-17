import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Department } from 'src/app/models/department';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.css']
})
export class EditcompanyComponent implements OnInit {
  departmentsList: Department[] = [];
  company: Company = {
    name: '',
    email: '',
    department: [],
  };
  removeDepartment?: Department;
  selectedDepartment?: Department;

  constructor(private userService: UserService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCompanyById(this.route.snapshot.params.id);
    this.getallDepartment();
  }
  async getCompanyById(id: number): Promise<void> {
    this.company = await this.userService.getCompanyById(id);
  }
  async  getallDepartment(){
    this.departmentsList = await this.userService.getallDepartment();
  }

  async removeDepartmentFromCompany(
    department: Department
  ): Promise<void> {
    this.removeDepartment = department;
    this.departmentsList.push(this.removeDepartment);
    this.company.department?.splice(
      this.company.department?.indexOf(this.removeDepartment),
      1
    );
  }

  async removeDepartments(department: Department): Promise<void> {
    this.selectedDepartment = department;
    this.company.department?.push(this.selectedDepartment);
    this.departmentsList.splice(
      this.departmentsList.indexOf(this.selectedDepartment),
      1
    );
  }

async updateCompany(): Promise<void> {
    const company: Company = {
      id: this.company.id,
      name: this.company.name,
      email: this.company.email,
      department:this.company.department,
    };
    await this.userService.updateCompany(company);
  }
}


