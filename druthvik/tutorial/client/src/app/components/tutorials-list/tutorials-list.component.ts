import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  categories!: Category[];
  selectedCategory = new Category();
  currentIndex = -1;
  title = '';
  selectedCategories: Category[] = [];

  constructor(
    private tutorialService: TutorialService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  async retrieveTutorials(): Promise<void> {
    this.tutorials = await this.tutorialService.getAll();
    localStorage.setItem('allTutorials', JSON.stringify(this.tutorials));
    console.log(localStorage.getItem('allTutorials'));
  }

  refreshList(): void {
    this.retrieveTutorials;
    this.currentTutorial = undefined;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentTutorial = undefined;
    this.currentIndex = -1;
    this.tutorialService.filterByTitle(this.title);
  }
  onSelected(value: Category) {
    this.selectedCategories.push(value);
  }
  gotoList() {
    this.router.navigate(['/tutorialform/add']);
  }
  // gotoList() {
  //   this.router.navigate(['/validation']);
  // }

  gotoEdit(id: any) {
    this.router.navigate(['/tutorialform/{{ currentTutorial.id }}']);
  }
  gotoDetails(id: any) {
    this.router.navigate(['/tutorialdetailview/{{currentTutorial.id}}']);
  }
}
