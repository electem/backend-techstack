import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/categoryTask.model';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-detail-view',
  templateUrl: './tutorial-detail-view.component.html',
  styleUrls: ['./tutorial-detail-view.component.css'],
})
export class TutorialDetialViewComponent implements OnInit {
  tutorial: Tutorial = {
    title: '',
    description: '',
    timeZone: '',
    categories: [],
  };
  tutorialId?: number;
  timeZone?: String; //change
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
    const data = await this.tutorialService.getTutorial(id);
    this.tutorial = data;
    this.timeZone = this.tutorial.timeZone;
    if (data.categories) {
      this.selectedCategory = data.categories[0];
    }
  }
}
