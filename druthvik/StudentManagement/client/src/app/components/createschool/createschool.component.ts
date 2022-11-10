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
    student: [],
  };
  currentTeacher = new Teacher();
  addedTeachers: Teacher[] = [];
  teachers: Teacher[] = [];
  currentStudent = new Student();
  addedStudents: Student[] = [];
  students: Student[] = [];
  requiredField: boolean = false;
  dropdownSettings: IDropdownSettings = {};
  showUpdateButton: boolean = true;
  showcreatebutton: boolean;
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
      student: ['', Validators.required],
    });
    this.retrieveTeachers();
    this.retrieveStudents();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };

    this.getSchoolById(this.route.snapshot.params.id);
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
    this.showcreatebutton = true;
    const createSchool: School = {
      name: this.createschool.name,
      address: this.createschool.address,
      teacher: this.addedTeachers,
      student: this.addedStudents,
    };
    await this.schoolservice.createSchool(createSchool);
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
    this.showcreatebutton = false;
    this.showUpdateButton = true;
    this.createschool = await this.schoolservice.getSchoolById(id);
  }
  async updateSchool(): Promise<void> {
    this.showcreatebutton = false;
    const school: School = {
      id: this.createschool.id,
      name: this.createschool.name,
      teacher: this.createschool.teacher,
      student: this.createschool.student,
    };
    await this.schoolservice.updateSchool(school);
    this.router.navigate(['/listschools']);
  }
}
