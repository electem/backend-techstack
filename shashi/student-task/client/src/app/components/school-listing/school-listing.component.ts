import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/school.model';
import { SchoolService } from 'src/app/services/student-task-service';

@Component({
  selector: 'app-school-listing',
  templateUrl: './school-listing.component.html',
  styleUrls: ['./school-listing.component.css'],
})
export class SchoolListingComponent implements OnInit {
  schoolsList: School[] = [];
  page?: number;
  itemsPerPage?: string;
  pagesizes = ['all', 2, 4, 6];
  totalItems?: number;
  constructor(private schoolService: SchoolService, private http: HttpClient) {}

  ngOnInit(): void {
    this.retrieveschools();
  }
  async retrieveschools(): Promise<void> {
    this.schoolsList = await this.schoolService.getSchools();
  }
  async pagination(page: number): Promise<void> {
    this.http
      .get(
        `http://localhost:3000/school?page=${page}&size=${this.itemsPerPage}`
      )
      .subscribe();
  }

  async handlePageSizeChange(event: Event): Promise<void> {
    this.itemsPerPage = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.retrieveschools();
  }
  
}
