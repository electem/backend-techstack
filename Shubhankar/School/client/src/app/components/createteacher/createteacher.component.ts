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
  selectedschool?: School;
  teacher: Teacher = {
    teachername: '',
    address: '',
    phonenumber: '',
    email: '',
    gender: '',
    schools: [],
  };

  schools: School[] = [];
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
    });
    this.retrieveSchool();
    this.retrieveTeacher(this.route.snapshot.params.id);
  }

  async retrieveSchool(): Promise<void> {
    this.schools = await this.schoolService.getallSchoolRecords();
  }

  public onSelectPushExtraSchoolToSchoolsList(school: School) {
    this.selectedschool = school;
    this.teacher.schools?.push(this.selectedschool);
  }

  get fval() {
    return this.createTeacher.controls;
  }
  async create() {
    this.submitted = true;
    if (this.createTeacher.invalid) {
      return;
    }
    this.getUpdated();
  }

  async getSubmit() {
    this.submitted = true;
    const teacherinfo: Teacher = {
      teachername: this.teacher.teachername,
      address: this.teacher.address,
      phonenumber: this.teacher.phonenumber,
      email: this.teacher.email,
      gender: this.teacher.gender,
      schools: this.teacher.schools,
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

  async getUpdated() {
    this.submitted = true;
    const teacherinfo: Teacher = {
      id: this.teacher.id,
      teachername: this.teacher.teachername,
      address: this.teacher.address,
      phonenumber: this.teacher.phonenumber,
      email: this.teacher.email,
      gender: this.teacher.gender,
      schools: this.teacher.schools,
    };
    await this.schoolService.updateTeacher(teacherinfo);
    this.router.navigate(['/teacher-list']);
  }
}
