import { Component, OnInit } from '@angular/core'
import { Category } from 'src/app/models/category'
import { Tutorial } from 'src/app/models/tutorial.model'
import { TutorialService } from 'src/app/services/tutorial.service'

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[]
  currentTutorial: Tutorial = {}
  currentIndex = -1
  Category?: Category[]
 
  // title = ''

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
   this.retrieveTutorials()
  }

  private async retrieveTutorials() {
    const data = await this.tutorialService.getAll();
    this.tutorials = data
    localStorage.setItem('GetRecords',JSON.stringify(this.tutorials));
   // console.log(localStorage.getItem('GetRecords'))
    localStorage.setItem('GetCurrent',JSON.stringify(this.currentTutorial));
  }



  refreshList(): void {
    this.retrieveTutorials()
    this.currentTutorial = {}
    this.currentIndex = -1
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial
    this.currentIndex = index
  }

 
}
