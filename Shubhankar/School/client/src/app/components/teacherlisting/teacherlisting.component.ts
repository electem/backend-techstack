import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-teacherlisting',
  templateUrl: './teacherlisting.component.html',
  styleUrls: ['./teacherlisting.component.css'],
})
export class TeacherlistingComponent implements OnInit {
  Teachers: Teacher[] = [];
  page = 3;
  itemsPerPage? = 2;
  totalItems?: string;
  pageSizes = [3, 6, 9];
  constructor(private schoolService: SchoolService, private http: HttpClient) {}

  ngOnInit(): void {
    this.retrieveAllTeachers();
  }
  async retrieveAllTeachers(): Promise<void> {
    this.Teachers = await this.schoolService.getallTeachers();
  }
  handlepageChange(page: number) {
    this.http
      .get(
        `http://localhost:3000/teacher?page=${page}&size=${this.itemsPerPage}`
      )
      .subscribe();
  }

  handlePageSizeChange(event: any) {
    this.itemsPerPage = event.target.value;
    this.page = 1;
    this.retrieveAllTeachers();
  }
}
