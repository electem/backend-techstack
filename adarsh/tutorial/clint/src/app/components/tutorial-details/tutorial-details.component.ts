import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { Category } from 'src/app/models/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { Moment } from 'moment';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  tutorial: Tutorial[] = [];
  categories: Category[] = [];
  selectedCategory = new Category();
  selectedCategoryNew = new Category();
  selectedCategories: Category[] = [];
  submitted: boolean = false;
  countries: any;

  currentTutorial: Tutorial = {
    title: '',
    description: '',
    author: '',
    categories: [],
    countries: '',
    timeZone: '',
  };
  message = '';
  registerForm!: FormGroup;
  selectedTz?: string;
  timeZone?: string[];

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      description: ['', Validators.required],
      title: ['', Validators.required],
      categories: ['', Validators.required],
      author: ['', Validators.required],
      countries: ['', Validators.required],
    });

    this.retrieveTutorials();
    this.retrieveCategory();
    this.countries = this.getCountries();
    if (this.route.snapshot.params.id != 'add') {
      this.getTutorial(this.route.snapshot.params.id);
    }
    this.timeZone = moment.tz.names();
  }
  get fval() {
    return this.registerForm.controls;
  }

  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
    this.saveTutorial();
  }

  getCountries() {
    return this.tutorialService.getCountriesData();
  }

  async saveTutorial(): Promise<void> {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      categories: this.selectedCategories,
      timeZone: this.currentTutorial.timeZone,
    };

    await this.tutorialService.createTutorial(data);
    this.router.navigate(['tutorials']);
  }

  async update(): Promise<void> {
    const data = {
      id: this.currentTutorial.id,
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      categories: this.selectedCategories,
    };
    if (this.selectedCategories.length)
      await this.tutorialService.updateTutorial(data);
  }

  onSelected(value: Category) {
    if (this.categories) {
      for (let category of this.categories) {
        if (category.id == value.id) {
          this.selectedCategoryNew.title = category.title;
          this.selectedCategories.push(this.selectedCategoryNew);
        }
      }
    }
  }

  private async getTutorial(id: Number) {
    const data = await this.tutorialService.getTutor(id);
    this.currentTutorial = data;
    if (this.currentTutorial.categories) {
      this.selectedCategory = this.currentTutorial.categories[0];
    }
  }

  async retrieveTutorials(): Promise<void> {
    this.tutorial = await this.tutorialService.getAll();
  }

  async retrieveCategory(): Promise<void> {
    this.categories = await this.tutorialService.getCategories();
    console.log();
  }
  public timeZoneChanged(timeZone: string): void {
    this.selectedTz = timeZone;
    this.currentTutorial.timeZone = timeZone;
  }
}

// async saveTutorial() {
//   const tutorialData: Tutorial = {
//     title: this.currentTutorial.title,
//     description: this.currentTutorial.description,
//     categories: this.selectedCategories
//   };
//   tutorialData.categories = this.selectedCategories;
//   await this.tutorialService.createTutorial(tutorialData);
//   console.log(tutorialData);
// }

// updatePublished(status: boolean): void {
//   const data = {
//     title: this.currentTutorial.title,
//     description: this.currentTutorial.description,
//     published: status,
//   }

//   this.message = ''

//   this.tutorialService.update(this.currentTutorial.id, data).subscribe(
//     (response) => {
//       console.log(response)
//       this.message = response.message
//         ? response.message
//         : 'The status was updated successfully!'
//     },
//     (error) => {
//       console.log(error)
//     },
//   )
// }

// updateTutorial(): void {
//   this.message = ''

//   this.tutorialService
//     .update(this.currentTutorial.id, this.currentTutorial)
//     .subscribe(
//       (response) => {
//         console.log(response)
//         this.message = response.message
//           ? response.message
//           : 'This tutorial was updated successfully!'
//       },
//       (error) => {
//         console.log(error)
//       },
//     )
// }

// deleteTutorial(): void {
//   this.tutorialService.delete(this.currentTutorial.id).subscribe(
//     (response) => {
//       console.log(response)
//       this.router.navigate(['/tutorials'])
//     },
//     (error) => {
//       console.log(error)
//     },
//   )
// }
