import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  submitted!: boolean;
  schools: School[] = [];
  schoolsList: School[] = [];
  addedSchools: School[] = [];
  selectedSchool: School = {};
  id?: number;
  addForm?: boolean;
  currentTeacher: Teacher = {
    teacherName: '',
    gender: '',
    address: '',
    email: '',
    schools: [],
  };

  constructor(
    private schoolService: SchoolService,
    private teacherService: TeacherService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      teacherName: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
      schools: ['', Validators.required],
    });
    this.getSchools();
    this.getStudentById(this.route.snapshot.params.id);
    this.id = this.route.snapshot.params.id;
    this.addForm = !this.id;
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
    this.schoolsList = this.schools;
  }

  async onSelectingSchool(school: School): Promise<void> {
    this.selectedSchool = school;
    this.addedSchools.push(this.selectedSchool);
  }

  async onSelectPushToCurrentSchool(school: School): Promise<void> {
    this.selectedSchool = school;
    this.currentTeacher.schools?.push(this.selectedSchool);
    this.schoolsList.splice(this.schoolsList.indexOf(this.selectedSchool), 1);
  }

  async onSelectPushToSchoolsList(school: School) {
    this.selectedSchool = school;
    this.schoolsList.push(this.selectedSchool!);
    this.currentTeacher.schools?.splice(
      this.currentTeacher.schools?.indexOf(this.selectedSchool),
      1
    );
  }

  async getStudentById(id: number): Promise<void> {
    this.currentTeacher = await this.teacherService.getTeacherById(id);
  }

  async saveTeacher(): Promise<void> {
    const teacher: Teacher = {
      teacherName: this.currentTeacher.teacherName,
      gender: this.currentTeacher.gender,
      address: this.currentTeacher.address,
      email: this.currentTeacher.email,
      phoneNo: this.currentTeacher.phoneNo,
      schools: this.addedSchools,
    };
    await this.teacherService.createTeacher(teacher);
    this.router.navigate(['/teacher-list']);
  }

  async updateTeacher(): Promise<void> {
    const teacher: Teacher = {
      teacherId: this.currentTeacher.teacherId,
      teacherName: this.currentTeacher.teacherName,
      gender: this.currentTeacher.gender,
      address: this.currentTeacher.address,
      email: this.currentTeacher.email,
      phoneNo: this.currentTeacher.phoneNo,
      schools: this.currentTeacher.schools,
    };
    await this.teacherService.updateTeacher(
      this.currentTeacher.teacherId!,
      teacher
    );
    this.router.navigate(['/teacher-list']);
  }
}
