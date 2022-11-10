import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { School } from '../../models/school';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-schoollisting',
  templateUrl: './schoollisting.component.html',
  styleUrls: ['./schoollisting.component.css'],
})
export class SchoollistingComponent implements OnInit {
  Schools: School[] = [];
  page = 3;
  itemsPerPage? = 2;
  totalItems?: string;
  pageSizes = [3, 6, 9];
  constructor(private schoolService: SchoolService, private http: HttpClient) {}

  ngOnInit(): void {
    this.retrieveAllSchools();
  }

  async retrieveAllSchools(): Promise<void> {
    this.Schools = await this.schoolService.getallSchools();
  }

  handlepageChange(page: number) {
    this.http
      .get(
        `http://localhost:3000/school?page=${page}&size=${this.itemsPerPage}`
      )
      .subscribe();
  }

  handlePageSizeChange(event: any) {
    this.itemsPerPage = event.target.value;
    this.page = 1;
    this.retrieveAllSchools();
  }
}
