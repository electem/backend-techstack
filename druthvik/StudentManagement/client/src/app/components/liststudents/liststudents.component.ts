import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-liststudents',
  templateUrl: './liststudents.component.html',
  styleUrls: ['./liststudents.component.css'],
})
export class ListstudentsComponent implements OnInit {
  students: Student[];
  constructor(private studentservice: StudentService) {}

  ngOnInit(): void {
    this.retrieveStudents();
  }

  async retrieveStudents(): Promise<void> {
    this.students = await this.studentservice.getStudents();
  }
}
