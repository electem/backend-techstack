import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Category } from 'src/app/models/category';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-detailnew',
  templateUrl: './tutorial-detailnew.component.html',
  styleUrls: ['./tutorial-detailnew.component.css']
})
export class TutorialDetailnewComponent implements OnInit {
currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
    categories: [],
    timezone: '',
  };
  message = '';
 selectedCategory = new Category();
  selectedCategories: Category[] = [];
  countries!: { name: string; }[];
  tutorials?: Tutorial[];
  selectedTz!: string;
  tutorial: any;
  userTz: string;
  utcTz: string;
  tzNames: string[];
  tutorialId?:number;
  
constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
   ) {this.userTz = moment.tz.guess();
    this.utcTz = 'UTC';
    this.tzNames = moment.tz.names();}

  ngOnInit() {
    this.getTutorialbyId(this.route.snapshot.params.id);
    this.tutorialId = this.route.snapshot.params.id;
   }

  async getTutorialbyId(id: number) {
    this.currentTutorial = await this.tutorialService.getbyId(id);
    if (this.currentTutorial.categories) {
      this.selectedCategory = this.currentTutorial.categories[0];
      
    }
 }
   }
  





