import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { School } from 'src/app/models/school.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Teacher } from '../../models/teacher.model';
import { TeacherService } from 'src/app/services/teacher.service';
import { SchoolService } from 'src/app/services/school.service';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../../models/student.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-createschool',
  templateUrl: './createschool.component.html',
  styleUrls: ['./createschool.component.css'],
})
export class CreateschoolComponent implements OnInit {
  createschoolForm: FormGroup;
  submitted = false;
  createschool: School = {
    name: '',
    address: '',
    teacher: [],
    students: [],
  };
  currentTeacher = new Teacher();
  addedTeachers: Teacher[] = [];
  teachers: Teacher[] = [];
  currentStudent = new Student();
  addedStudents: Student[] = [];
  students: Student[] = [];
  schools: School[] = [];
  requiredField: boolean = false;
  teacherDropdownSettings: IDropdownSettings = {};
  studentDropdownSettings: IDropdownSettings = {};
  id: number;
  addForm: boolean;
  constructor(
    private schoolservice: SchoolService,
    private teacherservice: TeacherService,
    private studentservice: StudentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.createschoolForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      teacher: ['', Validators.required],
      students: ['', Validators.required],
    });
    this.retrieveTeachers();
    this.retrieveStudents();
    this.teacherDropdownSettings = {
      idField: 'teacherid',
      textField: 'name',
    };
    this.studentDropdownSettings = {
      idField: 'studentid',
      textField: 'name',
    };
    if (this.route.snapshot.params.id) {
      this.getSchoolById(this.route.snapshot.params.id);
    }
    this.id = this.route.snapshot.params.id;
    this.addForm = !this.id;
  }

  get f() {
    return this.createschoolForm.controls;
  }

  async retrieveTeachers(): Promise<void> {
    this.teachers = await this.teacherservice.getTeachers();
  }

  async retrieveStudents(): Promise<void> {
    this.students = await this.studentservice.getStudents();
  }

  async createSchoolValidate(): Promise<void> {
    this.submitted = true;
    if (this.createschoolForm.invalid) {
      return;
    } else {
      this.createSchool();
    }
  }
  async createSchool(): Promise<void> {
    const createSchool: School = {
      name: this.createschool.name,
      address: this.createschool.address,
      teacher: this.addedTeachers,
      students: this.addedStudents,
    };
    await this.schoolservice.createSchool(createSchool);
    this.router.navigate(['/listschools']);
  }
  onSelectTeachers(teacher: Teacher) {
    this.currentTeacher = teacher;
    this.addedTeachers?.push(this.currentTeacher);
  }

  onSelectStudents(student: Student) {
    this.currentStudent = student;
    this.addedStudents?.push(this.currentStudent);
  }

  async getSchoolById(id: number) {
    this.createschool = await this.schoolservice.getSchoolById(id);
  }
  async updateSchool(): Promise<void> {
    const school: School = {
      schoolid: this.createschool.schoolid,
      name: this.createschool.name,
      address: this.createschool.address,
      teacher: this.createschool.teacher,
      students: this.createschool.students,
    };
    if (this.route.snapshot.params.id) {
      await this.schoolservice.updateSchool(school);
      this.router.navigate(['/listschools']);
    }
  }
}
