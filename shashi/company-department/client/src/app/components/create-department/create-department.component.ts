import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { CompanyService } from 'src/app/services/companyDepartment.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css'],
})
export class CreateDepartmentComponent implements OnInit {
  createDepartmentForm!: FormGroup;
  submitted = false;
  department: Department = {
    departmentname: '',
    type: '',
  };
  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createDepartmentForm = this.formBuilder.group({
      departmentname: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  get formValidation() {
    return this.createDepartmentForm.controls;
  }
  async saveDepartment(): Promise<void> {
    this.submitted = true;
    if (this.createDepartmentForm.invalid) {
      return;
    } else {
      this.saveDepartmentDetails();
    }
  }

  async saveDepartmentDetails(): Promise<void> {
    const departmentData: Department = {
      departmentname: this.department.departmentname,
      type: this.department.type,
    };
    await this.companyService.createDepartment(departmentData);
    // this.router.navigate(['/customerList']);
  }
}
