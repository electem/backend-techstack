import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { School } from 'src/app/models/school';
import { Student } from 'src/app/models/student';
import { Teacher } from 'src/app/models/teacher';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {
  newSchool: School = {
    name: '',
    address: '',
    teachers: [],
    students: [],
  };
  schools:School[]=[];
  students:Student[]=[];
  dropdownSettings: IDropdownSettings = {};
  selectedItems = [];
  registerForm!: FormGroup;
  teachers: Teacher[]=[];
  addnewTeacher: Teacher[]=[];
  selectedTeacher: Teacher ={};
  selectedStudent: Student ={};
  addnewStudent:Student[]=[];
  submitted?: boolean;

  constructor(private schoolService: SchoolService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      address:['', Validators.required],
    });
    this.retrieveTeachers();
    this.retrieveStudents();
  }
  async retrieveTeachers() {
    this.teachers = await this.schoolService.getTeachers();
  }
  async retrieveStudents() {
    this.students = await this.schoolService.getStudents();
  }

  onItemSelect(item: any) {
    this.selectedTeacher = item;
    this.addnewTeacher.push(this.selectedTeacher);
  }
  onSelectAll(items: any) {
    this.selectedTeacher = items;
    this.addnewTeacher.push(this.selectedTeacher);
  }
  get validation() {
    return this.registerForm.controls;
  }
  onStudentSelect(item: any) {
    this.selectedStudent = item;
    this.addnewStudent.push(this.selectedStudent);
  }
  onStudentSelectAll(items: any) {
    this.selectedStudent = items;
    this.addnewStudent.push(this.selectedStudent);
  }
  async saveNewSchool(): Promise<void> {
    const school: School = {
      name: this.newSchool.name,
      address:this.newSchool.address,
      teachers: this.addnewTeacher,
      students:this.addnewStudent,
    };
    // await this.schoolService.createNewSchool(school);
    this.router.navigate(['/schoolList']);
  }

}
