import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { School } from 'src/app/models/school.model';
import { Teacher } from 'src/app/models/teacher.model';
import { SchoolService } from 'src/app/services/school.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css'],
})
export class CreateTeacherComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;
  schools: School[] = [];
  addedSchools: School[] = [];
  selectedSchool: School = {};
  currentTeacher: Teacher = {
    name: '',
    gender: '',
    address: '',
    email: '',
    schools: [],
  };

  constructor(
    private schoolService: SchoolService,
    private teacherService: TeacherService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
    });
    this.getSchools();
  }

  get validation() {
    return this.registerForm.controls;
  }

  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
    this.saveTeacher();
  }

  async getSchools(): Promise<void> {
    this.schools = await this.schoolService.getSchools();
  }

  async onSelectingSchool(school: School): Promise<void> {
    this.selectedSchool = school;
    this.addedSchools.push(this.selectedSchool);
  }

  async saveTeacher(): Promise<void> {
    const teacher: Teacher = {
      name: this.currentTeacher.name,
      gender: this.currentTeacher.gender,
      address: this.currentTeacher.address,
      email: this.currentTeacher.email,
      phoneNo: this.currentTeacher.phoneNo,
      schools: this.addedSchools,
    };
    await this.teacherService.createTeacher(teacher);
    this.router.navigate(['/teacher-list']);
  }
}
