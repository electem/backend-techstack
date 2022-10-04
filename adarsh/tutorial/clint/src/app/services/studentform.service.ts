import { Injectable } from '@angular/core';
import { Student } from '../models/studentform.model';

@Injectable({
  providedIn: 'root'
})
export class StudentformService {

  constructor() { }

  private courses = [
  { "name":"BSc"},
  { "name":"BBA"},
  { "name":"BCom"},
  { "name":"BCA"},
  { "name":"BE"},
  { "name":"MSc"},
  { "name":"MBA"}];

  private students:Student[]=[
    {
     firstName: 'Varun',
      address:'Bangalore',
      phoneNo:9758585444,
      course: 'MBA'
    },
    {
      firstName: 'Dhanush',
       address:'Mangalore',
       phoneNo:9648585444,
       course: 'MSc'
     }
  ]

    getCourses():Student[]{
    return this.students;
  }

  getStudentsFromData(): Student[] {
    return this.students;
  }

  getCoursesFromData() {
    return this.courses;
  }

  addStudent(student: Student) {
    this.students.push(student);
  }

  updateStudent(student: Student) {
    const index = this.students.findIndex(s => student.phoneNo === s.phoneNo);
    this.students[index] = student;
  }

  deleteStudent(student: Student) {
    this.students.splice(this.students.indexOf(student), 1);
  }
}
