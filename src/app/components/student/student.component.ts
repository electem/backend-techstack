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
  courseFk = null;
  students: Student[];
  submitted = false;
  address='';
  errorMsg='';
  listCourse;
  student: Student = {
    studentId:'',
    studentName: '',
    studentEmail: '',
    password:''
  };
  constructor(private studentService: StudentService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.courseName();
  };

  //fetch course
  courseName(): void {
    this.studentService.getCource().subscribe((data) => {
      console.log(data);
      this.listCourse = data;
       }); 
  }
  //save the student 
  saveStudent(){
    var course=this.listCourse.find(course=>course.courceId === this.courseFk);
    //var courseIndex= this.listCourse.findIndex(course=>course.courceId===this.courseFk)
    const data = {
     studentName: this.student.studentName,
     studentEmail: this.student.studentEmail, 
     password:this.student.password,
     course,
     address: {address:this.address
    }
    };
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
