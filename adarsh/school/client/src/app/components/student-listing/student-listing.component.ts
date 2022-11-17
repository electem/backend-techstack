import { HttpClient } from '@angular/common/http';
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
count: number = 3;
  totalItems?: number;
  pageSizes = [3, 6, 9];
  page?: number;
 

  constructor(private schoolService: SchoolService,private http: HttpClient) { }

  ngOnInit(): void {
    this.retrieveStudent();
  }
  async retrieveStudent() {
    this.students = await this.schoolService.getStudents();
   
  }
  }



