import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { SchoolService } from 'src/app/services/school.service';
import { School } from 'src/app/models/school.model';
import { Gender, TeacherService } from 'src/app/services/teacher.service';
import { DatepickerOptions } from 'ng2-datepicker';
@Component({
  selector: 'app-createstudent',
  templateUrl: './createstudent.component.html',
  styleUrls: ['./createstudent.component.css'],
})
export class CreatestudentComponent implements OnInit {
  createtStudentForm: FormGroup;
  submitted = false;
  createstudent: Student = {
    name: '',
    address: '',
    phonenumber: null,
    email: '',
    gender: '',
    dateofbirth: '',
    school: {},
  };
  schools: School[];
  genders: Gender[];
  radioSel: any;
  radioSelected: string;
  radioSelectedString: string;
  date = new Date();
  options: DatepickerOptions = {
    format: 'DD-MM-YYYY',
    placeholder: 'select date',
    calendarClass: 'datepicker-default',
  };

  selectedSchool = new School();
  selectedGender: string;
  constructor(
    private studentservice: StudentService,
    private formBuilder: FormBuilder,
    private schoolservice: SchoolService,
    private teacherservice: TeacherService,
  ) {}

  ngOnInit(): void {
    this.createtStudentForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      school: ['', Validators.required],
    });
    this.retrieveSchools();
    this.getGenders();
  }
  get f() {
    return this.createtStudentForm.controls;
  }
  async createStudentValidate(): Promise<void> {
    this.submitted = true;
    if (this.createtStudentForm.invalid) {
      return;
    } else {
      this.createStudent();
    }
  }
  async createStudent(): Promise<void> {
    const createStudents: Student = {
      name: this.createstudent.name,
      address: this.createstudent.address,
      phonenumber: this.createstudent.phonenumber,
      email: this.createstudent.email,
      gender: this.selectedGender,
      dateofbirth: this.createstudent.dateofbirth,
      school: this.createstudent.school,
    };
    await this.studentservice.createStudent(createStudents);
  }

  async retrieveSchools(): Promise<void> {
    this.schools = await this.schoolservice.getSchools();
  }
  getGenders() {
    this.genders = this.teacherservice.getGenders();
  }
  onSelected(value: School) {
    this.createstudent.school = value;
  }

  getSelectedGenderChange(gender: Gender) {
    this.selectedGender = gender.name;
  }
  onStudentGenderChange(gender: Gender) {
    this.getSelectedGenderChange(gender);
  }
}
