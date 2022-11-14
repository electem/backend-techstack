import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from 'src/app/models/school.model';
import { Teacher } from 'src/app/models/teacher.model';
import { SchoolService } from 'src/app/services/student-task-service';
import { Gender } from 'src/app/services/student-task-service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css'],
})
export class CreateTeacherComponent implements OnInit {
  schoolsList: School[] = [];
  currentSchool!: School;
  selectedSchool: School[] = [];
  createTeacherForm!: FormGroup;
  submitted = false;
  teacher: Teacher = {
    teachername: '',
    address: '',
    email: '',
    gender: '',
    school: [],
  };
  gendersList?: string[];
  currentGender!: string;
  selectedGender!: any;
  model = { option: 'option3' };
  ischecked?: boolean;
  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params.id) {
      this.getTeacherById(this.route.snapshot.params.id);
    }
    this.createTeacherForm = this.formBuilder.group({
      teachername: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      school: ['', Validators.required],
    });
    this.retieveGenders();
    this.retrieveschools();
  }
  get formValidation() {
    return this.createTeacherForm.controls;
  }
  retieveGenders() {
    this.gendersList = this.schoolService.genderList;
  }
  async retrieveschools(): Promise<void> {
    this.schoolsList = await this.schoolService.getSchools();
  }
  async checkValidation(): Promise<void> {
    this.submitted = true;
    if (this.createTeacherForm.invalid) {
      return;
    } else {
      this.saveTeacherDetails();
    }
  }
  async saveTeacherDetails(): Promise<void> {
    const teacherData: Teacher = {
      teachername: this.teacher.teachername,
      address: this.teacher.address,
      email: this.teacher.email,
      gender: this.teacher.gender,
      school: this.selectedSchool,
    };
    await this.schoolService.createTeacher(teacherData);
    this.router.navigate(['/teacherslist']);
  }
  getSelectedTeacherGender(gender: string) {
    this.currentGender = gender;
  }
  async selectedSchoolMethod(school: School): Promise<void> {
    this.currentSchool = school;
    this.selectedSchool?.push(this.currentSchool);
  }

  async getTeacherById(id: number): Promise<void> {
    this.teacher = await this.schoolService.getTeacherById(id);
    this.teacherSchool(this.currentSchool);
  }
  async teacherSchool(school: School) {
    if ((this.ischecked = true)) {
      console.log(school);
      const data = this.teacher.school?.filter(
        (s) => s.schoolid === school.schoolname
      );
      //this.currentSchool = data[0];
    }
  }
  async updateTeacher(): Promise<void> {
    const teacherData: Teacher = {
      teacherid: this.teacher.teacherid,
      teachername: this.teacher.teachername,
      address: this.teacher.address,
      email: this.teacher.email,
      gender: this.teacher.gender,
      school: this.teacher.school,
    };
    await this.schoolService.updateTeacher(teacherData);
  }
}
