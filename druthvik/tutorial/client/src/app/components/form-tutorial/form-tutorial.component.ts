import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-form-tutorial',
  templateUrl: './form-tutorial.component.html',
  styleUrls: ['./form-tutorial.component.css'],
})
export class FormTutorialComponent implements OnInit {
  submitted: boolean = false;
  update: boolean = true;
  tutorials?: Tutorial[];
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
    categories: [],
  };

  tutorialData: Tutorial = {
    title: '',
    description: '',
    published: false,
    categories: [],
  };

  categories?: Category[];
  selectedCategory = new Category();
  selectedCategories: Category[] = [];
  selectedTutorial = new Tutorial();
  selectedValue!: any;
  updateCategory!: Category[];
  timeZoneNames!: string[];
  selectedTimeZone!: string;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.timeZoneNames = moment.tz.names();
    this.timeZoneChanged('America/New_York');
  }

  ngOnInit(): void {
    this.retriveCategory();
    if (this.route.snapshot.params.id != 'add') {
      this.getTutorial(this.route.snapshot.params.id);
      this.update = false;
    }
  }

  async retriveCategory(): Promise<void> {
    this.categories = await this.tutorialService.getAllCategory();
  }
  async getTutorialbyId(id: number) {
    this.tutorial = await this.tutorialService.getbyId(id);
  }
  async getTutorial(id: Number) {
    const data = await this.tutorialService.getTutor(id);
    this.tutorial = data;
    if (data.categories) {
      this.selectedCategory = data.categories[0];
    }
  }
  async retrieveTutorials(): Promise<void> {
    this.tutorials = await this.tutorialService.getAll();
  }

  onSelected(value: Category) {
    if (this.categories) {
      for (let category of this.categories) {
        if (category.id == value.id) {
          this.selectedCategories.push(category);
        }
      }
    }
  }

  async saveTutorial() {
    if (this.tutorial.title != '') {
      const tutorialData: Tutorial = {
        title: this.tutorial.title,
        description: this.tutorial.description,
        published: (this.tutorial.published = false),
      };
      tutorialData.categories = this.selectedCategories;
      await this.tutorialService.createTutorial(tutorialData);
      this.router.navigate(['/tutorials']);
      console.log(tutorialData);
    } else {
      this.submitted = true;
    }
  }
  async saveTutorial1() {
    const tutorialData: Tutorial = {
      title: this.tutorial.title,
      description: this.tutorial.description,
      published: (this.tutorial.published = false),
      timeZone: this.tutorial.timeZone,
    };
    tutorialData.categories = this.selectedCategories;
    await this.tutorialService.createTutorial(tutorialData);
    this.router.navigate(['/tutorials']);
    console.log(tutorialData);
  }
  async updateTutorial() {
    // if (this.update && this.selectedCategories.length == 0) {
    //   if (this.tutorial.categories) {
    //     this.selectedCategories = this.tutorial.categories;
    //   }
    // }
    const tutorialData: Tutorial = {
      id: this.tutorial.id,
      title: this.tutorial.title,
      description: this.tutorial.description,
      published: (this.tutorial.published = false),
    };
    tutorialData.categories = this.selectedCategories;
    await this.tutorialService.update(tutorialData);
    this.router.navigate(['/tutorials']);
    console.log(tutorialData);
  }
  timeZoneChanged(timeZone: string): void {
    console.log(timeZone);
    this.selectedTimeZone = timeZone;
    this.tutorial.timeZone = timeZone;
  }
}
