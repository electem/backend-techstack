import { Component, OnInit } from '@angular/core';
import { School } from '../../models/school.model';
import { SchoolService } from 'src/app/services/school.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-listschools',
  templateUrl: './listschools.component.html',
  styleUrls: ['./listschools.component.css'],
})
export class ListschoolsComponent implements OnInit {
  page: number;
  count: number = 3;
  totalItems: number;
  pageSizes = [3, 6, 9];
  schools: School[];
  constructor(private schoolservice: SchoolService, private http: HttpClient) {}

  ngOnInit(): void {
    this.retrieveSchools();
  }

  async retrieveSchools(): Promise<void> {
    this.schools = await this.schoolservice.getSchools();
  }
  pagination(page: any) {
    this.http
      .get(`http://localhost:3000/school?page=${page}&size=${this.count}`)
      .toPromise();
  }

  handlePageSizeChange(event) {
    this.count = event.target.value;
    this.page = 1;
    this.retrieveSchools();
  }

  async deleteSchoolById(id: number) {
    await this.schoolservice.deletSchoolById(id);
    this.retrieveSchools();
  }
}
