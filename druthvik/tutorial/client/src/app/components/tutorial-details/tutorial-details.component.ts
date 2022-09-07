import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
    categories: [],
  };
  message = '';
  categories!: Category[];
  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.retriveCategory();
    this.getTutorialbyId(this.route.snapshot.params.id);
  }

  async retriveCategory(): Promise<void> {
    this.categories = await this.tutorialService.getAllCategory();
  }
  async getTutorialbyId(id: number) {
    this.currentTutorial = await this.tutorialService.getbyId(id);
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status,
    };

    // this.message = '';
    // this.tutorialService.update(this.currentTutorial.id, data);

    // this.tutorialService.update(this.currentTutorial.id, data).subscribe(
    //   (response) => {
    //     this.currentTutorial.published = status;
    //     console.log(response);
    //     this.message = response.message
    //       ? response.message
    //       : 'This tutorial was updated successfully!';
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  // updateTutorial(): void {
  //   this.message = '';

  //   this.tutorialService
  //     .update(this.currentTutorial.id, this.currentTutorial)
  //     .subscribe(
  //       (response) => {
  //         console.log(response);
  //         this.message = response.message
  //           ? response.message
  //           : 'This tutorial was updated successfully!';
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }
  // updateTutorial() {
  //   this.message = '';

  //   this.tutorialService.update(this.currentTutorial.id, this.currentTutorial);
  // }

  // deleteTutorial() {
  //   this.tutorialService.delete(this.currentTutorial.id).subscribe(
  //     (response) => {
  //       this.router.navigate(['/tutorials']);
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //   this.router.navigate(['/tutorials']);
  // }

  async deletebyid() {
    await this.tutorialService.deletebyid(this.currentTutorial.id);
  }
}
