import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/school.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from 'src/app/services/student-task-service';
import { Teacher } from 'src/app/models/teacher.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.css'],
})
export class CreateSchoolComponent implements OnInit {
  teachersList: Teacher[] = [];
  dropdownSettings: IDropdownSettings = {};
  createSchoolForm!: FormGroup;
  currentTeacher!: Teacher;
  AddedTeachers: Teacher[] = [];
  AllSelectedTeachers: Teacher[] = [];
  requiredField: boolean = false;
  submitted = false;
  school: School = {
    schoolname: '',
    address: '',
    teacher: [],
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
    this.retriveTeachers();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'teachername',
    };
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
  async retriveTeachers(): Promise<void> {
    this.teachersList = await this.schoolService.getTeachers();
  }
  async selectedTeacher(teacher: any): Promise<void> {
    this.currentTeacher = teacher;
    this.AddedTeachers?.push(this.currentTeacher);
  }
    async saveSchoolDetails(): Promise<void> {
    const schoolData: School = {
      schoolname: this.school.schoolname,
      address: this.school.address,
      teacher: this.AddedTeachers,
    };
    await this.schoolService.createSchool(schoolData);
  }
}
