import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-newtutorial',
  templateUrl: './newtutorial.component.html',
  styleUrls: ['./newtutorial.component.css']
})
export class NewtutorialComponent implements OnInit {
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
  }
  message = ''

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.message = ''
    this.getTutorial(this.route.snapshot.params.id)
  }

  private async getTutorial(id: string) {
    // const data = await this.tutorialService.get(id);
    // this.currentTutorial = data
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status,
    }

    this.message = ''

  //   this.tutorialService.update(this.currentTutorial.id, data).subscribe(
  //     (response) => {
  //       this.currentTutorial.published = status
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
   }

}
