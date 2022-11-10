import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],
})
export class StudentlistComponent implements OnInit {
  students: Student[] = [];

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.retrieveAllStudents();
  }

  async retrieveAllStudents(): Promise<void> {
    this.students = await this.schoolService.getallStudents();
  }
}
