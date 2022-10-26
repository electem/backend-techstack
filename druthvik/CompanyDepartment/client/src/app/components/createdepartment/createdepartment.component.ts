import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-createdepartment',
  templateUrl: './createdepartment.component.html',
  styleUrls: ['./createdepartment.component.css'],
})
export class CreatedepartmentComponent implements OnInit {
  createdepartmentForm: FormGroup;
  submitted = false;
  createdepartment: Department = {
    name: '',
    type: '',
  };
  constructor(
    private departmentservice: DepartmentService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createdepartmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  get f() {
    return this.createdepartmentForm.controls;
  }
  async createDepatmentValidate(): Promise<void> {
    this.submitted = true;
    if (this.createdepartmentForm.invalid) {
      return;
    } else {
      this.createDepartment();
    }
  }
  async createDepartment(): Promise<void> {
    const createDepartment: Department = {
      name: this.createdepartment.name,
      type: this.createdepartment.type,
    };
    await this.departmentservice.createDepartment(createDepartment);
  }
}
