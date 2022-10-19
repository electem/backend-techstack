import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Student } from 'src/app/models/studentform.model';
import { StudentformService } from 'src/app/services/studentform.service';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})
export class StudentformComponent implements OnInit {

  constructor(
    private studentService: StudentformService,
    private route: ActivatedRoute,
    private router: Router) { }

    students: Student[]=[];
    courses: any;
    studentForm: boolean = false;
    isNewStudent: boolean = false;
    newStudent: any = {};
    editStudentForm: boolean = false;
    editedStudent: any = {};
    filterStudent: Student[] = [];
    searchText: string | undefined;
    currentStudent: Student = {
      firstName: '',
      address: '',
      phoneNo: 856958595895,
      course: ''
    }
    ngOnInit() {
      this.students = this.getStudents();
      this.courses = this.getCourses();
      this.filterStudent = this.students;
    }

     set searchTerm(value: string) {
      this.searchText = value;
      if (this.searchText == "") {
        this.filterStudent = this.students;
      } else {
        this.filterStudent = this.getFilteredList(value);
        console.log("");
      }
    }
  
    getFilteredList(searchText: string) {
      return this.filterStudent.filter((student) => {
        return student.firstName.toLowerCase().includes(searchText);
      });
    }
     
    getCourses() {
      return this.studentService.getCoursesFromData();
    }
  
    getStudents(): Student[] {
      return this.studentService.getStudentsFromData();
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
  
    showAddStudentForm() {
      // resets form if edited user
      this.editStudentForm = false;
      if (this.students.length) {
        this.newStudent = {};
      }
      this.studentForm = true;
      this.isNewStudent = true;
    }
  
    saveStudent(student: Student) {
      if (this.isNewStudent) {
        // add a new user
        this.studentService.addStudent(student);
      }
      this.studentForm = false;
    }
  
    updateStudent() {
      this.studentService.updateStudent(this.editedStudent);
      this.editStudentForm = false;
      this.editedStudent = {};
    }
  
    removeStudent(student: Student) {
      this.studentService.deleteStudent(student);
    }
  
    cancelEdits() {
      this.editedStudent = {};
      this.editStudentForm = false;
    }
  
    cancelNewStudent() {
      this.newStudent = {};
      this.studentForm = false;
    }
  }
  
