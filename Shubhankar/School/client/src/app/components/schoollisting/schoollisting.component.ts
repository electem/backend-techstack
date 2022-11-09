import { Component, OnInit } from '@angular/core';
import { School } from '../../models/school';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-schoollisting',
  templateUrl: './schoollisting.component.html',
  styleUrls: ['./schoollisting.component.css']
})
export class SchoollistingComponent implements OnInit {
  Schools: School[]=[];
  constructor(private schoolService: SchoolService,
   ) {}

  ngOnInit(): void {
    this.retrieveAllSchools();
  }

  async retrieveAllSchools(): Promise<void> {
    this.Schools = await this.schoolService.getallSchools();
  }
}
