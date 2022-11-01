import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/studentform.model';
import { StudentformService } from 'src/app/services/studentform.service';

@Component({
  selector: 'app-edit-student-form',
  templateUrl: './edit-student-form.component.html',
  styleUrls: ['./edit-student-form.component.css']
})
export class EditStudentFormComponent implements OnInit {
  currentStudent: Student = {
    firstName: '',
    address: '',
    phoneNo: 0,
    course: ''
  }
  studentForm: boolean = false;
  editStudentForm: boolean = false;
  editedStudent: any = {};
  courses: any;

  constructor(
    private studentService: StudentformService,
    private route: ActivatedRoute,
    private router: Router)
   { }

  ngOnInit(): void {
    this.courses = this.getCourses();
  }

  getCourses() {
    return this.studentService.getCoursesFromData();
  }
  
  showEditStudentForm(student: Student) {
    this.studentForm = false;
    if (!student) {
      this.studentForm = false;
      return;
    }
   this.editStudentForm = true;
    this.editedStudent = student;
  }

  updateStudent() {
    this.studentService.updateStudent(this.editedStudent);
   this.editStudentForm = false;
    this.editedStudent = {};
  }
  cancelEdits() {
    this.editedStudent = {};
    this.editStudentForm = false;
  }
}
