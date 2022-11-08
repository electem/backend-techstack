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
  constructor(private teacherservice: TeacherService) {}

  ngOnInit(): void {
    this.retrieveTeachers();
  }

  async retrieveTeachers(): Promise<void> {
    this.teachers = await this.teacherservice.getTeachers();
  }
}
