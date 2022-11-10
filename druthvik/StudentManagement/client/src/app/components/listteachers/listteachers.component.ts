import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherService } from 'src/app/services/teacher.service';
@Component({
  selector: 'app-listteachers',
  templateUrl: './listteachers.component.html',
  styleUrls: ['./listteachers.component.css'],
})
export class ListteachersComponent implements OnInit {
  teachers: Teacher[];
  page: number;
  count: number = 3;
  totalItems: number;
  pageSizes = [3, 6, 9];
  constructor(
    private teacherservice: TeacherService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.retrieveTeachers();
  }

  async retrieveTeachers(): Promise<void> {
    this.teachers = await this.teacherservice.getTeachers();
  }

  pagination(page: any) {
    this.http
      .get(`http://localhost:3000/teacher?page=${page}&size=${this.count}`)
      .toPromise();
  }

  handlePageSizeChange(event) {
    this.count = event.target.value;
    this.page = 1;
    this.retrieveTeachers();
  }


  async deleteTeacherById(id: number) {
    await this.teacherservice.deletTeacherById(id);
    this.retrieveTeachers();
  }
}
