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
  updateSchoolsList: School[] = [];
  currentSchool!: School;
  removeCurrentSchool!: School;
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
  id?: number;
  addForm?: boolean;
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
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3}))$/
          ),
        ]),
      ],
      gender: ['', Validators.required],
      school: ['', Validators.required],
      //school2: ['', Validators.required],
    });
    this.retieveGenders();
    this.retrieveschools();
    this.id = this.route.snapshot.params.id;
    this.addForm = !this.id;
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
  async removeActiveDepartment(school: School): Promise<void> {
    this.removeCurrentSchool = school;
    this.schoolsList?.push(this.currentSchool);
    // this.schoolsList!.splice(
    //   this.schoolsList!.indexOf(this.removeCurrentSchool),
    //   1
    // );
  }

  // async removeSelectedDepartmentFromCompany(
  //   department: Department
  // ): Promise<void> {
  //   this.removeDepartment = department;
  //   this.departmentsList.push(this.removeDepartment);
  //   this.company.department?.splice(
  //     this.company.department?.indexOf(this.removeDepartment),
  //     1
  //   );
  // }
  async getTeacherById(id: number): Promise<void> {
    this.teacher = await this.schoolService.getTeacherById(id);
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
