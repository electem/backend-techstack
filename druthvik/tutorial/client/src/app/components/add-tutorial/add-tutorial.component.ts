import { Component, Input, OnInit, Output } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { TutorialsListComponent } from '../tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from '../tutorial-details/tutorial-details.component';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent implements OnInit {
  private tutoriallist!: [];

  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {}

  async saveTutorial1() {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
      published: (this.tutorial.published = false),
    };

    await this.tutorialService.createTutorial(data);
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false,
    };
  }
}
