import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from 'src/app/models/school';
import { Student } from 'src/app/models/student';
import { Gender, SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-createstudent',
  templateUrl: './createstudent.component.html',
  styleUrls: ['./createstudent.component.css'],
})
export class CreatestudentComponent implements OnInit {
  createStudent!: FormGroup;
  submitted: boolean = false;
  currentGender!: string;
  genderlist: Gender[] = [];
  selectedGender!: any;
  selectedschool?: School;
  currentSchool!: School;

  student: Student = {
    studentname: '',
    address: '',
    phonenumber: '',
    email: '',
    gender: '',
  };

  schools: School[] = [];

  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createStudent = this.formBuilder.group({
      studentname: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      dateofbirth: ['', Validators.required],
    });
    this.retriveGenders();
    this.retrieveSchool();
    this.retrieveStudent(this.route.snapshot.params.id);
  }

  async retrieveSchool(): Promise<void> {
    this.schools = await this.schoolService.getallSchoolRecords();
    console.log(this.schools);
  }

  async retriveGenders(): Promise<void> {
    this.genderlist = await this.schoolService.genderList();
    console.log(this.genderlist);
  }

  get fval() {
    return this.createStudent.controls;
  }
  async create() {
    this.submitted = true;
    if (this.createStudent.invalid) {
      return;
    }
    this.getUpdated();
  }

  async getSubmit() {
    this.submitted = true;
    const studentinfo: Student = {
      studentname: this.student.studentname,
      address: this.student.address,
      phonenumber: this.student.phonenumber,
      email: this.student.email,
      gender: this.student.gender,
      dateofbirth: this.student.dateofbirth,
      schools: this.student.schools,
    };
    await this.schoolService.createStudent(studentinfo);
  }

  getStudentGender(gender: Gender) {
    this.currentGender = gender.name;
  }

  private selectedLink: string = 'Male';

  setradio(e: string): void {
    this.selectedLink = e;
  }

  isSelected(name: string): boolean {
    if (!this.selectedLink) {
      return false;
    }

    return this.selectedLink === name;
  }

  async selectedSchool(school: School): Promise<void> {
    this.currentSchool = school;
  }
  getBack() {
    this.router.navigate([]);
  }

  async retrieveStudent(id: number): Promise<void> {
    this.student = await this.schoolService.getStudentbyid(id);
  }

  async getUpdated() {
    this.submitted = true;
    const studentinfo: Student = {
      id: this.student.id,
      studentname: this.student.studentname,
      address: this.student.address,
      phonenumber: this.student.phonenumber,
      email: this.student.email,
      gender: this.student.gender,
      dateofbirth: this.student.dateofbirth,
      schools: this.student.schools,
    };
    await this.schoolService.updateStudent(studentinfo);
    this.router.navigate(['student-list']);
  }
}
