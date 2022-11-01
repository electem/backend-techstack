import { Component, OnInit } from '@angular/core'
import { StudentService } from 'src/app/services/student.service'
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  Course = {
    course1: '',
    course2: '',
  }
  courses: any;
  isNewUser: any;
  userForm!: boolean;
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.courses = this.getCourseData();
    
  }
  getCourseData(): Course[] {
    return this.studentService.getCourse();

  }
  saveUsercourse(user: Course) {
    if (this.isNewUser) {
      // add a new user
      this.studentService.addUser(user)
    }
    this.userForm = false;
  }
}

 
