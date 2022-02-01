import { Component, OnInit } from '@angular/core';
import { Student } from '@app/models/student.model';
import {StudentService} from 'src/app/services/student.service';
import { Course } from '@app/models/Course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.less']
})
export class StudentComponent implements OnInit {
  studentForm: FormGroup;
  selectedCourse = null;
  students: Student[];
  submitted = false;
  errorMsg='';
  listCourse;
  student: Student = {
    studentId:'',
    studentName: '',
    studentEmail: '',
    password:'',
    courceIdFK :''
  };
  constructor(private studentService: StudentService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.courseName();
  };

  courseName(): void
  {
    this.studentService.getCource().subscribe((data) => {
      console.log(data);
      this.listCourse = data;
       }); 
  }
  //save the student 
  saveStudent(){
    const data = {
     studentName: this.student.studentName,
     studentEmail: this.student.studentEmail, 
     password:this.student.password,
    course : {
      courceName: this.selectedCourse
    }
    };
    /* const data = {
      "studentName": "anffand",
       "studentEmail": "abdddc@gmail",
       "password": "abcd",
       "course": null,
    };*/
    this.studentService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });     
  }
}
