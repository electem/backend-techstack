import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/teacher.model';
import { SchoolService } from 'src/app/services/student-task-service';
@Component({
  selector: 'app-teacher-listing',
  templateUrl: './teacher-listing.component.html',
  styleUrls: ['./teacher-listing.component.css'],
})
export class TeacherListingComponent implements OnInit {
  teachersList: Teacher[] = [];
  page?: number;
  itemsPerPage?: string;
  pagesizes = ['all', 2, 4, 6];
  totalItems?: number;
  constructor(private schoolService: SchoolService, private http: HttpClient) {}

  ngOnInit(): void {
    this.retrieveTeachers();
  }
  async retrieveTeachers(): Promise<void> {
    this.teachersList = await this.schoolService.getTeachers();
  }
  async pagination(page: number): Promise<void> {
    this.http
      .get(
        `http://localhost:3000/teacher?page=${page}&size=${this.itemsPerPage}`
      )
      .subscribe();
  }

  async handlePageSizeChange(event: Event): Promise<void> {
    this.itemsPerPage = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.retrieveTeachers();
  }
}
