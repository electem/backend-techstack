import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-liststudents',
  templateUrl: './liststudents.component.html',
  styleUrls: ['./liststudents.component.css'],
})
export class ListstudentsComponent implements OnInit {
  page: number;
  count: number = 3;
  totalItems: number;
  pageSizes = [3, 6, 9];
  students: Student[];
  constructor(
    private studentservice: StudentService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.retrieveStudents();
  }

  async retrieveStudents(): Promise<void> {
    this.students = await this.studentservice.getStudents();
  }
  pagination(page: any) {
    this.http
      .get(`http://localhost:3000/student?page=${page}&size=${this.count}`)
      .toPromise();
  }

  handlePageSizeChange(event) {
    this.count = event.target.value;
    this.page = 1;
    this.retrieveStudents();
  }

  async deleteStudentById(id: number) {
    await this.studentservice.deletStudentById(id);
    this.retrieveStudents();
  }
}
