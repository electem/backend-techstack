import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-view-detials',
  templateUrl: './tutorial-view-detials.component.html',
  styleUrls: ['./tutorial-view-detials.component.css'],
})
export class TutorialViewDetialsComponent implements OnInit {
  tutorial: Tutorial[] = [];
  categories: Category[] = [];
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    author: '',
    categories: [],
    countries: '',
    timeZone: '',
    creatDate: '',
  };
  selectedCategory = new Category();
  tutorialId?: Number;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrieveTutorials();
    this.retrieveCategory();
    this.getTutorial(this.route.snapshot.params.id);
    this.tutorialId = this.route.snapshot.params.id;
  }
  async retrieveTutorials(): Promise<void> {
    this.tutorial = await this.tutorialService.getAll();
  }

  async retrieveCategory(): Promise<void> {
    this.categories = await this.tutorialService.getCategories();
    console.log();
  }
  private async getTutorial(id: Number) {
    const data = await this.tutorialService.getTutor(id);
    this.currentTutorial = data;
    if (this.currentTutorial.categories) {
      this.selectedCategory = this.currentTutorial.categories[0];
    }
  }
}
