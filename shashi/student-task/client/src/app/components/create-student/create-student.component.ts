import { Component, Injectable, OnInit } from '@angular/core';
import { School } from 'src/app/models/school.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from 'src/app/services/student-task-service';
import { Teacher } from 'src/app/models/teacher.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Student } from 'src/app/models/student.model';
import { Router } from '@angular/router';
import { Gender } from 'src/app/services/student-task-service';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent implements OnInit {
  createStudentForm!: FormGroup;
  date = new Date();
  options: DatepickerOptions = {
    format: 'DD-MM-YYYY',
    placeholder: 'select date',
  };
  student: Student = {
    studentname: '',
    address: '',
    email: '',
    gender: '',
    school: new School(),
  };
  currentSchool!: School;
  schoolsList: School[] = [];
  gendersList?: Gender[];
  currentGender!: Gender;
  selectedGender!: any;
  model = { option: 'option3' };

  submitted = false;
  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createStudentForm = this.formBuilder.group({
      studentname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.retrieveschools();
    this.retieveGenders();
  }

  retieveGenders() {
    this.gendersList = this.schoolService.genderList;
  }
  get formValidation() {
    return this.createStudentForm.controls;
  }
  async retrieveschools(): Promise<void> {
    this.schoolsList = await this.schoolService.getSchools();
  }

  async checkValidation(): Promise<void> {
    this.submitted = true;
    if (this.createStudentForm.invalid) {
      return;
    } else {
      this.saveStudentDetails();
    }
  }
  async saveStudentDetails(): Promise<void> {
    const StudentData: Student = {
      studentname: this.student.studentname,
      address: this.student.address,
      email: this.student.email,
      gender: this.student.gender,
      school: this.currentSchool,
    };
    await this.schoolService.createStudent(StudentData);
    this.router.navigate(['/schoollisting']);
  }
  async selectedGenderMethod(gender: any): Promise<void> {
    this.currentGender = gender;
    this.selectedGender?.push(this.currentGender);
  }
  async selectedSchool(school: School): Promise<void> {
    this.currentSchool = school;
  }
}
