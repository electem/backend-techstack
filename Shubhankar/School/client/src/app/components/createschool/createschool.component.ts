import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { School } from 'src/app/models/school';
import { Student } from 'src/app/models/student';
import { Teacher } from 'src/app/models/teacher';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-createschool',
  templateUrl: './createschool.component.html',
  styleUrls: ['./createschool.component.css'],
})
export class CreateschoolComponent implements OnInit {
  createSchool!: FormGroup;
  submitted: boolean = false;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingstudent: IDropdownSettings = {};

  school: School = {
    schoolname: '',
    address: '',
    teachers: [],
    students: [],
  };
  teachers: Teacher[] = [];
  students: Student[] = [];
  currentTeacher!: Teacher;
  AddedTeachers: Teacher[] = [];
  currentStudent!: Student;
  AddedStudent: Student[] = [];
  
  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createSchool = this.formBuilder.group({
      schoolname: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.dropdownSettings = {
      idField: 'id',
      textField: 'teachername',
      selectAllText: 'Select All',
    };

    this.retrieveTeachers();
    this.dropdownSettingstudent = {
      idField: 'id',
      textField: 'studentname',
      selectAllText: 'Select All',
    };

    this.retrieveStudents();
    this.retrieveSchool(this.route.snapshot.params.id);
  }

  async retrieveTeachers(): Promise<void> {
    this.teachers = await this.schoolService.getallTeachers();
  }

  async retrieveStudents(): Promise<void> {
    this.students = await this.schoolService.getallStudents();
  }

  async selectedTeachers(teacher: any): Promise<void> {
    this.currentTeacher = teacher;
    this.AddedTeachers?.push(this.currentTeacher);
  }

  async onSelectAllTeachers(teacher: any): Promise<void> {
    this.currentTeacher = teacher;
    this.AddedTeachers?.push(this.currentTeacher);
  }

  async selectedStudent(student: any): Promise<void> {
    this.currentStudent = student;
    this.AddedStudent?.push(this.currentStudent);
  }

  async onSelectAllStudent(student: any): Promise<void> {
    this.currentStudent = student;
    this.AddedStudent?.push(this.currentStudent);
  }

  get fval() {
    return this.createSchool.controls;
  }
  async updateSchool() {
    this.submitted = true;
    if (this.createSchool.invalid) {
      return;
    }
    this.getUpdated();
  }

  async getSubmit() {
    this.submitted = true;
    const schoolinfo: School = {
      schoolname: this.school.schoolname,
      address: this.school.address,
      teachers: this.AddedTeachers,
      students: this.AddedStudent,
    };
    await this.schoolService.createSchool(schoolinfo);
    this.router.navigate(['school-list']);
  }

  getBack() {
    this.router.navigate([]);
  }

  async retrieveSchool(id: number): Promise<void> {
    this.school = await this.schoolService.getSchoolbyid(id);
  }

  async getUpdated() {
    this.submitted = true;
    const schoolinfo: School = {
      id:this.school.id,
      schoolname: this.school.schoolname,
      address: this.school.address,
      teachers: this.AddedTeachers,
      students: this.AddedStudent,
    };
    await this.schoolService.updateSchool(schoolinfo);
    this.router.navigate(['school-list']);
  }
}
