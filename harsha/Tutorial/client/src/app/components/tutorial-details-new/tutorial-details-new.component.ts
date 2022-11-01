import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service'
import { ActivatedRoute,} from '@angular/router'

@Component({
  selector: 'app-tutorial-details-new',
  templateUrl: './tutorial-details-new.component.html',
  styleUrls: ['./tutorial-details-new.component.css']
})
export class TutorialDetailsNewComponent implements OnInit {
  tutorial: Tutorial[] =[]; 
  categories: Category[] = [];
  selectedCategory = new Category()
  selectedCategoryNew = new Category()
  selectedCategories: Category[] = [];
  countries:any;
  timezoneNames: string[] = [];
  selectedTimezone!: string;
  timeZone?: String;
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    author:'',
    categories: [],
    countries:'',
    timezone:'',
    createdAt:'',
  }
  tutorialId:any;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
   
  ) { }

  ngOnInit(): void {
   
      this.getTutorial(this.route.snapshot.params.id);
    this.tutorialId=this.route.snapshot.params.id;
  }

  private async getTutorial(id: Number) {
    const data = await this.tutorialService.getTutor(id)
    this.currentTutorial = data;
    this.timeZone =this.currentTutorial.timezone;
    if(this.currentTutorial.categories){
    this.selectedCategory = this.currentTutorial.categories[0];
    }
  }
}
