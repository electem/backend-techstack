import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/school.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from 'src/app/services/student-task-service';
import { Teacher } from 'src/app/models/teacher.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Student } from 'src/app/models/student.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.css'],
})
export class CreateSchoolComponent implements OnInit {
  teachersList: Teacher[] = [];
  studentsList: Student[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsForStudent: IDropdownSettings = {};
  createSchoolForm!: FormGroup;
  currentTeacher!: Teacher;
  AddedTeachers: Teacher[] = [];
  currentStudent!: Student;
  AddedStudents: Student[] = [];
  AllSelectedTeachers: Teacher[] = [];
  submitted = false;
  school: School = {
    schoolname: '',
    address: '',
    teacher: [],
    students: [],
  };
  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSchoolById(this.route.snapshot.params.id);
    this.createSchoolForm = this.formBuilder.group({
      schoolname: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.retriveTeachers();
    this.retriveStudents();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'teachername',
    };
    this.dropdownSettingsForStudent = {
      idField: 'id',
      textField: 'studentname',
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
  async saveSchoolDetails(): Promise<void> {
    const schoolData: School = {
      schoolname: this.school.schoolname,
      address: this.school.address,
      teacher: this.AddedTeachers,
      students: this.AddedStudents,
    };
    await this.schoolService.createSchool(schoolData);
    this.router.navigate(['/schoollisting']);
  }
  async retriveTeachers(): Promise<void> {
    this.teachersList = await this.schoolService.getTeachers();
  }
  async retriveStudents(): Promise<void> {
    this.studentsList = await this.schoolService.getStudents();
  }

  async selectedTeacher(teacher: any): Promise<void> {
    this.currentTeacher = teacher;
    this.AddedTeachers?.push(this.currentTeacher);
  }
  async selectedStudent(student: any): Promise<void> {
    this.currentStudent = student;
    this.AddedStudents?.push(this.currentStudent);
  }
  async getSchoolById(id: number): Promise<void> {
    this.school = await this.schoolService.getSchoolById(id);
  }
  async updateSchool(): Promise<void> {
    const school: School = {
      id: this.school.id,
      schoolname: this.school.schoolname,
      address: this.school.address,
      teacher: this.school.teacher,
      students: this.school.students,
    };
    await this.schoolService.updateSchool(school);
  }
}
