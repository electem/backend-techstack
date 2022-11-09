import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/app/services/student-task-service';
import { Student } from 'src/app/models/student.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-listing',
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.css'],
})
export class StudentListingComponent implements OnInit {
  studentsList: Student[] = [];
  page?: number;
  itemsPerPage?: string;
  pagesizes = ['all', 2, 4, 6];
  totalItems?: number;
  constructor(private schoolService: SchoolService, private http: HttpClient) {}

  ngOnInit(): void {
    this.retrieveStudents();
  }
  async retrieveStudents(): Promise<void> {
    this.studentsList = await this.schoolService.getStudents();
  }
  async pagination(page: number): Promise<void> {
    this.http
      .get(
        `http://localhost:3000/student?page=${page}&size=${this.itemsPerPage}`
      )
      .subscribe();
  }

  async handlePageSizeChange(event: Event): Promise<void> {
    this.itemsPerPage = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.retrieveStudents();
  }
}
