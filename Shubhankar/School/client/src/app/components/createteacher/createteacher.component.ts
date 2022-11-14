import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from 'src/app/models/school';
import { Teacher } from 'src/app/models/teacher';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-createteacher',
  templateUrl: './createteacher.component.html',
  styleUrls: ['./createteacher.component.css'],
})
export class CreateteacherComponent implements OnInit {
  createTeacher!: FormGroup;
  submitted: boolean = false;
  teacher: Teacher = {
    teachername: '',
    address: '',
    phonenumber: '',
    email: '',
    gender: '',
    schools: [],
  };

  id?: number;
  isAddMode?: boolean;

  schools: School[] = [];
  currentSchool: School = {};
  selectedSchool: School[] = [];

  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createTeacher = this.formBuilder.group({
      teachername: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      schools:['', Validators.required],
    });
    this.retrieveSchool();
    this.retrieveTeacher(this.route.snapshot.params.id);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  }

  async retrieveSchool(): Promise<void> {
    this.schools = await this.schoolService.getallSchoolRecords();
  }

   async selectedSchoolRecord(school: School): Promise<void> {
    this.currentSchool = school;
    this.selectedSchool?.push(this.currentSchool);
  }

  get fval() {
    return this.createTeacher.controls;
  }
 
  async saveTeacher() {
    this.submitted = true;
    if (this.createTeacher.invalid) {
      return;
    }
    this.getSubmit();
  }

  async getSubmit() {
    this.submitted = true;
    const teacherinfo: Teacher = {
      teachername: this.teacher.teachername,
      address: this.teacher.address,
      phonenumber: this.teacher.phonenumber,
      email: this.teacher.email,
      gender: this.teacher.gender,
      schools: this.selectedSchool,
    };
    await this.schoolService.createTeacher(teacherinfo);
    this.router.navigate(['/teacher-list']);
  }

  getBack() {
    this.router.navigate(['/teacher-list']);
  }

  async retrieveTeacher(id: number): Promise<void> {
    this.teacher = await this.schoolService.getTeacherbyid(id);
  }

  async updateTeacher() {
    this.submitted = true;
    if (this.createTeacher.invalid) {
      return;
    }
    this.getUpdated();
  }

  async getUpdated() {
    this.submitted = true;
    const teacherinfo: Teacher = {
      teacherid: this.teacher.teacherid,
      teachername: this.teacher.teachername,
      address: this.teacher.address,
      phonenumber: this.teacher.phonenumber,
      email: this.teacher.email,
      gender: this.teacher.gender,
      schools: this.selectedSchool,
    };
    await this.schoolService.updateTeacher(teacherinfo);
    this.router.navigate(['/teacher-list']);
  }

  async selectedSchools(school: string) {
    console.log(school);
    const data = this.schools.filter((s) => s.schoolid === +school);
    this.currentSchool = data[0];
  }
}
