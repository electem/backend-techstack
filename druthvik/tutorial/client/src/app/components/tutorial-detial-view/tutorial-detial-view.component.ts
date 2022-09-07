import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-detial-view',
  templateUrl: './tutorial-detial-view.component.html',
  styleUrls: ['./tutorial-detial-view.component.css'],
})
export class TutorialDetialViewComponent implements OnInit {
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
    timeZone: '',
    categories: [],
    createdAt: '',
  };
  tutorialId?: number;
  selectedCategory = new Category();

  constructor(
    private route: ActivatedRoute,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.getTutorial(this.route.snapshot.params.id);
    this.tutorialId = this.route.snapshot.params.id;
  }

  async getTutorial(id: Number) {
    const data = await this.tutorialService.getTutor(id);
    this.tutorial = data;
    if (data.categories) {
      this.selectedCategory = data.categories[0];
    }
  }
}
