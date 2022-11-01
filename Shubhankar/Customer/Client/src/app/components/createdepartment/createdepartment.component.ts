import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Department } from '../../models/department';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-createdepartment',
  templateUrl: './createdepartment.component.html',
  styleUrls: ['./createdepartment.component.css'],
})
export class CreatedepartmentComponent implements OnInit {
  createDepartment!: FormGroup;
  submitted: boolean = false;
  depertment: Department = {
    name: '',
    type: '',
  };
  
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createDepartment = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  get fval() {
    return this.createDepartment.controls;
  }
  async signup() {
    this.submitted = true;
    if (this.createDepartment.invalid) {
      return;
    }
  }

  async getSubmit() {
    this.submitted = true;
    const departmentinfo: Department = {
      name: this.depertment.name,
      type: this.depertment.type,
    };
    await this.userService.createdepartment(departmentinfo);
    this.router.navigate(['/department']);
  }
}
