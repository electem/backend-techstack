import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { School } from 'src/app/models/school';
import { Student } from 'src/app/models/student';
import { Teacher } from 'src/app/models/teacher';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-createschool',
  templateUrl: './createschool.component.html',
  styleUrls: ['./createschool.component.css']
})
export class CreateschoolComponent implements OnInit {
  createSchool!: FormGroup;
  submitted: boolean = false;
  dropdownSettings: IDropdownSettings = {};
  school: School = {
    schoolname: '',
    address: '',
    
  };
  teachers: Teacher[] = [];
  students:Student[]=[];
  currentTeacher!: Teacher;
  AddedTeachers: Teacher[] = [];
  currentStudent!:Student;
  AddedStudent:Student[]=[];
  constructor(private schoolService: SchoolService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createSchool = this.formBuilder.group({
      schoolname: ['', Validators.required],
      address: ['', Validators.required],
     });
     this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
  }

  async selectedTeachers(teacher: any): Promise<void> {
    this.currentTeacher = teacher;
    this.AddedTeachers?.push(this.currentTeacher);
  }

  async onSelectAllTeachers(teacher: any): Promise<void> {
    this.currentTeacher = teacher;
    this.AddedTeachers?.push(this.currentTeacher);
  }

  async selectedStudent(student: any): Promise<void> {
    this.currentStudent = student;
    this.AddedStudent?.push(this.currentStudent);
  }

  async onSelectAllStudent(student: any): Promise<void> {
    this.currentStudent = student;
    this.AddedStudent?.push(this.currentStudent);
  }


  get fval() {
    return this.createSchool.controls;
  }
  async create() {
    this.submitted = true;
    if (this.createSchool.invalid) {
      return;
    }
  }

  async getSubmit() {
    this.submitted = true;
    const schoolinfo: School = {
      schoolname: this.school.schoolname,
      address: this.school.address,
      
    };
    await this.schoolService.createSchool(schoolinfo);
   }

   getBack(){
    this.router.navigate([]);
  }
}
