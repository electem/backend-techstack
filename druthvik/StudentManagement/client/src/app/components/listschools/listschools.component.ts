import { Component, OnInit } from '@angular/core';
import { School } from '../../models/school.model';
import { SchoolService } from 'src/app/services/school.service';
@Component({
  selector: 'app-listschools',
  templateUrl: './listschools.component.html',
  styleUrls: ['./listschools.component.css'],
})
export class ListschoolsComponent implements OnInit {
  schools: School[];
  constructor(private schoolservice: SchoolService) {}

  ngOnInit(): void {
    this.retrieveSchools();
  }

  async retrieveSchools(): Promise<void> {
    this.schools = await this.schoolservice.getSchools();
  }
}
