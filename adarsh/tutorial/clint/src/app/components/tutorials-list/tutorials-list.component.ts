import { Component, OnInit } from '@angular/core'
import { Tutorial } from 'src/app/models/tutorial.model'
import { TutorialService } from 'src/app/services/tutorial.service'

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[]
  tutorial: any;
  categories:any
  clickDetailed!: boolean; 
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    categories: undefined
   }
  currentIndex = -1
  title = ''
  Token: any;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.getAuthentication();
    this.retrieveCategory();
    this.retrieveTutorials();
    
     }

  async retrieveTutorials(): Promise<void> {
    this.tutorial = await this.tutorialService.getAll();
  }
  async retrieveCategory(): Promise<void> {
    this.categories = await this.tutorialService.getCategories();
  }
  
  refreshList(): void {
    this.currentTutorial = {}
    this.currentIndex = -1
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial
    this.currentIndex = index
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll().subscribe(
      (response) => {
        console.log(response)
        this.refreshList()
      },
      (error) => {
        console.log(error)
      },
    )
  }

  searchTitle(): void {
    this.currentTutorial = {}
    this.currentIndex = -1
    this.tutorialService.findByTitle(this.title).subscribe(
      (data) => {
        this.tutorials = data
        console.log(data)
      },
      (error) => {
        console.log(error)
      },
    )
  }

async getAuthentication() {
this.Token = await this.tutorialService.getAthontication();
localStorage.setItem('id_token', this.Token.token);
const expiration = localStorage.getItem('id_token');
 }
}
