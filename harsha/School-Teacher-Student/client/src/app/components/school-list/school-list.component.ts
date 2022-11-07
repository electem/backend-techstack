import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/school.model';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css'],
})
export class SchoolListComponent implements OnInit {
  schools: School[] = [];

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.getSchools();
  }

  async getSchools(): Promise<void> {
    this.schools = await this.schoolService.getSchools();
  }
}
