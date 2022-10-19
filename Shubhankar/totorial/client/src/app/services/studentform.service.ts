import { Injectable } from '@angular/core';
import { Student } from '../models/Stud';

@Injectable({
  providedIn: 'root'
})
export class StudentformService {
 

  constructor() { }
  // dropdownList = [];
  // selectedItems = [];
  // dropdownSettings = {};
  private course = [

    {
      "name":'BBA'
      
    },
    {
      "name":'MMC'
    }
  ];
  private students: Student[] = [
    {
      
      firstName: 'Injamul',
      Address: 'Delhi',
      Phoneno: 7676869585,
      course: 'Language'
    },
    { 
      firstName: 'Ravi',
      Address: 'Mumbai',
      Phoneno: 8584692134,
      course: 'B.Tech'
    },
    {
      firstName: 'Monu',
      Address: 'Bhopal',
      Phoneno: 6987456987,
      course: 'ItI'
    },
    {
      firstName: 'Durgesh',
      Address: 'Kerela',
      Phoneno: 4587965412,
      course: 'It'
    }
    ];
 

  getCourseData(){
    return this.course;
  }
  getStudentFromData(): Student[] {
    return this.students;
  }


 
 addStudent(student: Student): void {
  
    this.students.push(student);
  }
  updatestudent(student: Student) {
    const index = this.students.findIndex(u => student.firstName === u.firstName);
    this.students[index] = student;
  }
  deletestudent(student: Student){
    this.students.splice(this.students.indexOf(student), 1);
  }
}



