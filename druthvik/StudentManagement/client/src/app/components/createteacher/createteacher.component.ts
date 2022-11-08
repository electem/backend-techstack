import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { Gender, TeacherService } from 'src/app/services/teacher.service';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-createteacher',
  templateUrl: './createteacher.component.html',
  styleUrls: ['./createteacher.component.css'],
})
export class CreateteacherComponent implements OnInit {
  createtTeacherForm: FormGroup;
  submitted = false;
  createteacher: Teacher = {
    name: '',
    address: '',
    phonenumber: null,
    email: '',
    gender: '',
    student: [],
  };
  studentlist: Student[] = [];
  currentStudent = new Student();
  AdddedStudentsList: Student[] = [];
  genders: Gender[];
  selectedGender: string;
  constructor(
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.createtTeacherForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.getGenders();
    this.retrieveStudents();
  }
  get f() {
    return this.createtTeacherForm.controls;
  }
  async createTeacherValidate(): Promise<void> {
    this.submitted = true;
    if (this.createtTeacherForm.invalid) {
      return;
    } else {
      this.createTeacher();
    }
  }
  async createTeacher(): Promise<void> {
    const createCompany: Teacher = {
      name: this.createteacher.name,
      address: this.createteacher.address,
      phonenumber: this.createteacher.phonenumber,
      email: this.createteacher.email,
      gender: this.selectedGender,
      student: this.AdddedStudentsList,
    };
    await this.teacherService.createTeacher(createCompany);
  }
  async retrieveStudents(): Promise<void> {
    this.studentlist = await this.studentService.getStudents();
  }

  async selectedStudents(student: Student): Promise<void> {
    this.currentStudent = student;

    this.AdddedStudentsList?.push(this.currentStudent);
  }

  getGenders() {
    this.genders = this.teacherService.getGenders();
  }

  getSelecteditem(gender: Gender) {
    this.selectedGender = gender.name;
  }

  onItemChange(gender: Gender) {
    this.getSelecteditem(gender);
  }
}
