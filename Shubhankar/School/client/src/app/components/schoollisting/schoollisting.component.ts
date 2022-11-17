import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from '../../models/school';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-schoollisting',
  templateUrl: './schoollisting.component.html',
  styleUrls: ['./schoollisting.component.css'],
})
export class SchoollistingComponent implements OnInit {
  Schools: School[] = [];
  page = 1;
  itemsPerPage? = 2;
  totalItems?: string;
  pageSizes = [3, 6, 9];

  school: School = {
    schoolname: '',
    address: '',
    teachers: [],
    students: [],
  };
  constructor(
    private schoolService: SchoolService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrieveAllSchools();
    this.retrieveSchool(this.route.snapshot.params.id);
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

  async retrieveSchool(id: number): Promise<void> {
    this.school = await this.schoolService.getSchoolbyid(id);
  }

 async Deleteschool(id:number){
   await this.schoolService.deleteSchool(id);
   this.retrieveAllSchools();
 }

//  async deleteStudentById(id: number) {
//   await this.studentservice.deletStudentById(id);
//   this.retrieveStudents();
// }
}
