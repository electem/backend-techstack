import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-student-listing',
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.css']
})
export class StudentListingComponent implements OnInit {
students:Student[]=[];

  constructor(private schoolService: SchoolService,) { }

  ngOnInit(): void {
    this.retrieveStudent();
  }
  async retrieveStudent() {
    this.students = await this.schoolService.getStudents();
  }
}
