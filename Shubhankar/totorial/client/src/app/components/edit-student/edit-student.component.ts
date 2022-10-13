import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Stud';
import { StudentformService } from 'src/app/services/studentform.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  StudentformService: any;
  constructor(private studentFormService:StudentformService) { }

  students: Student[] = [];
  firstname:any;
  studentForm: boolean = false;
  isNewstudent: boolean = false;
  filterStudent:Student[]=[];
  newstudent: any = {};
  editstudentForm: boolean = false;
  editedstudent: any = {};
  searchText!: string;
  StudentService: any;
  courses: any;
  

  ngOnInit(): void {
    this.students = this.getStudents();
    this .courses = this.getcourse();
  }

  getStudents(): Student[] {
    return this.studentFormService.getStudentFromData();
  }
  getcourse(): { name: string; }[] {
    return this.studentFormService. getCourseData();
  }

  showEditStudentForm(student: Student) {
    if (!student) {
      this.studentForm = false;
      return;
    }
    this.editstudentForm = true;
    this.editedstudent = student;
  }
  savestudent(students: Student) {
    if (this.isNewstudent) {
      // add a new user
      this.StudentformService.addStudent(students)
    }
    this.studentForm = false;
  }

  updatestudent() {
    this.StudentService.updateStudent(this.  editedstudent);
    this.editstudentForm = false;
    this.editedstudent = {};
  }
  removestudent(students: Student) {
    this.StudentService.deletestudent(students);
  }

  cancelEdits() {
    this.editedstudent = {};
    this.editstudentForm = false;
  }
  cancelNewstudent() {
    this.newstudent = {};
    this.studentForm = false;
  }
  }

