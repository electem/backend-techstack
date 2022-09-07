import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model'
import { TutorialService } from 'src/app/services/tutorial.service'

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
  tutorial: Tutorial[] =[]; 
  tutorials: Tutorial = {
    title: '',
    description: '',
  }
  submitted = false
  constructor(private tutorialService: TutorialService) { }
 

  ngOnInit(): void {
    this.retrieveTutorials()
  }
  async retrieveTutorials(): Promise<void> {
    this.tutorial = await this.tutorialService.getAll();
  }

  // saveTutorial(): void {
  //   const data = {
  //     title: this.tutorials.title,
  //     description: this.tutorials.description,
  //   }

  //   this.tutorialService.create(data).subscribe(
  //     (response) => {
  //       console.log(response)
  //       this.submitted = true
  //     },
  //     (error) => {
  //       console.log(error)
  //     },
  //   )
  // }

  newTutorial(): void {
    this.submitted = false
    this.tutorials = {
      title: '',
      description: '',
        }
  }
}
