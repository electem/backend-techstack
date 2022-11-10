import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { Gender, TeacherService } from 'src/app/services/teacher.service';
import { SchoolService } from 'src/app/services/school.service';
import { School } from 'src/app/models/school.model';
import { ActivatedRoute, Router } from '@angular/router';

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
    school: [],
  };
  schools: School[] = [];
  currentSchool = new School();
  AdddedSchoolList: School[] = [];
  genders: Gender[];
  selectedGender: string;
  showeditedform: boolean;
  showform: boolean;
  isAddMode: boolean;
  constructor(
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private schoolservice: SchoolService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createtTeacherForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      school: ['', Validators.required],
    });
    this.getGenders();
    this.retrieveSchools();
    this.getTeacherById(this.route.snapshot.params.id);
    this.isAddMode = !this.getTeacherById(this.route.snapshot.params.id);
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
      school: this.AdddedSchoolList,
    };
    await this.teacherService.createTeacher(createCompany);
  }
  async retrieveSchools(): Promise<void> {
    this.schools = await this.schoolservice.getSchools();
  }
  async selectedSchools(school: School): Promise<void> {
    this.currentSchool = school;
    this.AdddedSchoolList?.push(this.currentSchool);
  }

  getGenders() {
    this.genders = this.teacherService.getGenders();
  }

  getSelectedTeacherGender(gender: Gender) {
    this.selectedGender = gender.name;
  }

  onSelectTeacherGender(gender: Gender) {
    this.getSelectedTeacherGender(gender);
  }
  async getTeacherById(id: number) {
    this.showform = false;
    this.showeditedform = true;
    this.createteacher = await this.teacherService.getTeacherById(id);
  }

  async updateTeacher(): Promise<void> {
    const teacher: Teacher = {
      id: this.createteacher.id,
      name: this.createteacher.name,
      phonenumber: this.createteacher.phonenumber,
      email: this.createteacher.email,
      gender: this.createteacher.gender,
      school: this.createteacher.school,
    };
    await this.teacherService.updateTeacher(teacher);
    this.router.navigate(['/listteachers']);
  }
}
