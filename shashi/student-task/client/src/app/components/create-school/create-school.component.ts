import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/school.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from 'src/app/services/student-task-service';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.css'],
})
export class CreateSchoolComponent implements OnInit {
  createSchoolForm!: FormGroup;
  submitted = false;
  school: School = {
    schoolname: '',
    address: '',
  };
  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createSchoolForm = this.formBuilder.group({
      schoolname: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  get formValidation() {
    return this.createSchoolForm.controls;
  }

  async checkValidation(): Promise<void> {
    this.submitted = true;
    if (this.createSchoolForm.invalid) {
      return;
    } else {
      this.saveSchoolDetails();
    }
  }
  async saveSchoolDetails(): Promise<void> {
    const schoolData: School = {
      schoolname: this.school.schoolname,
      address: this.school.address,
    };
    await this.schoolService.createSchool(schoolData);
  }
}
