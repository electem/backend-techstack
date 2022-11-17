import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from 'src/app/models/school';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-listing',
  templateUrl: './school-listing.component.html',
  styleUrls: ['./school-listing.component.css']
})
export class SchoolListingComponent implements OnInit {
schools:School[]=[];

  constructor( private schoolService: SchoolService,
    private router: Router,
    private route: ActivatedRoute) { }
 

  ngOnInit(): void {
    this.retrieveSchools()
  }
  async retrieveSchools() {
    this.schools = await this.schoolService.getSchool();
  }
}
