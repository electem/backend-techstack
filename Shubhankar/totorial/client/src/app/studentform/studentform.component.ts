// import { Component, OnInit } from '@angular/core';
// import { Student } from '../models/Stud';
// import { StudentformService } from '../services/studentform.service';
// @Component({
//   selector: 'app-studentform',
//   templateUrl: './studentform.component.html',
//   styleUrls: ['./studentform.component.css']
// })
// export class StudentformComponent implements OnInit {


// constructor(private studentFormService:StudentformService) { }

//  students: Student[] = [];
//  studentForm: boolean = false;
//   isNewstudent: boolean = false;
//   filterStudent:Student[]=[];
//   newstudent: any = {};
//   editstudentForm: boolean = false;
//   editedstudent: any = {};
//   searchText!: string;
//   StudentService: any;
//   courses: any;

// set searchTerm(value: string) {
// this.searchText = value;
//  if (this.searchText == "") {
//  this.filterStudent = this.students;
//   } else {
//  this.filterStudent = this.getFilteredList(value);
//  console.log("");
// }
// }
// getFilteredList(searchText: string) {
// return this.filterStudent.filter((student) => {
// return student.firstName.toLowerCase().includes(searchText);
//  });
// }
  
// ngOnInit() {
//     this.students = this.getStudents();
//     this .courses = this.getcourse();
//    this.filterStudent=this.students;
//   }
//   getcourse() {
//     return this.studentFormService. getCourseData();
//   }
  
//   getStudents(): Student[] {
//     return this.studentFormService.getStudentFromData();
//   }
  

//   Removestudent(student: Student) {
//     this.studentFormService.deletestudent(student);
//   }
//   showEditStudentForm(student: Student) {
//     if (!student) {
//       this.studentForm = false;
//       return;
//     }
//     this.editstudentForm = true;
//     this.editedstudent = student;
//   }

//   showAddStudentForm() {
//     // resets form if edited user
//     if (this.students.length) {
//       this.newstudent = {};
//     }
//     this.studentForm = true;
//     this.isNewstudent = true;

//   }

//   savestudent(student: Student) {
//     if (this.isNewstudent) {
      
//       this.studentFormService.addStudent(student)
//     }
//     //this.studentForm = false;
//   }

//   updatestudent() {
//     this.StudentService.updateStudent(this.  editedstudent);
//     this.editstudentForm = false;
//     this.editedstudent = {};
//   }

//   removeStudent(student: Student) {
//     this.studentFormService.deletestudent(student);
//   }

//   cancelEdits() {
//     this.editedstudent = {};
//     this.editstudentForm = false;
//   }

//   cancelNewstudent() {
//     this.newstudent = {};
//     this.studentForm = false;
//   }

// }




