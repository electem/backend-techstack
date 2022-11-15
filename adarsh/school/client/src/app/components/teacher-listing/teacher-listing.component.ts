import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/teacher';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-teacher-listing',
  templateUrl: './teacher-listing.component.html',
  styleUrls: ['./teacher-listing.component.css'],
})
export class TeacherListingComponent implements OnInit {
  teachers:Teacher[]=[]
  constructor( private schoolService: SchoolService,) {}

  ngOnInit(): void {
    this.retrieveTeachers();
  }
  async retrieveTeachers() {
    this.teachers = await this.schoolService.getTeachers();
  }
}
