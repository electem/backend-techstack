import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { Category } from 'src/app/models/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  registerForm!: FormGroup;
  submitted=false;
  country: any;
  currentTutorial: Tutorial = {
    
    title: '',
    description: '',
    published: false,
    categories: [],
  };
  message = '';
  categories!: Category[];
  selectedCategory = new Category();
  selectedCategories: Category[] = [];
  countries!: { name: string; }[];
  tutorials?: Tutorial[];
  // Categoey?: Category[] ;
 
 
 
  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['',  Validators.required ],
      category:['',  Validators.required ],
      country:['', Validators.required]
    })
    this.message = '';
      this.retriveCategory();
   // this.retriveCategorylocal(this.route.snapshot.params.id);
     this.getTutorialbyId(this.route.snapshot.params.id);
    this.countries = this.getCountry();
    //this.getTutorialbyIdd(this.route.snapshot.params.id);
  }

  getCountry() {
    return this.tutorialService. getCountryData();
  }

   async retriveCategory(): Promise<void> {
    this.categories = await this.tutorialService.getAllCategory();
    

}

  onSelected(value: Category) {
    if (this.categories) {
      for (let category of this.categories) {
        if (category.id == value.id) {
          this.selectedCategories.push(category);
        }
      }
    }
  }

  async getTutorialbyIdd(id: number) {
    this.tutorials = JSON.parse(localStorage.getItem('GetCurrent') ||  '{}');
    this.currentTutorial= this.tutorials?.find((x) =>x.id ==id)!;
    console.log(localStorage.getItem('GetCurrent'))
}

// async  retriveCategorylocal(id: number){
//      this.Categoey =  JSON.parse(localStorage.getItem('GetCategory') || '{}');
//      this.selectedCategory = this.Categoey?.find((y) => y.id == id)!;
// }



  async getTutorialbyId(id: number) {
    this.currentTutorial = await this.tutorialService.getbyId(id);
    if (this.currentTutorial.categories) {
      console.log();
      this.selectedCategory = this.currentTutorial.categories[0];
    }
     localStorage.setItem('myData',JSON.stringify(this.currentTutorial));
    console.log(localStorage.getItem('myData'))
  }

  async  saveTutorial(){
    this.submitted = true
    if(this.registerForm.invalid){
    return
}else{
     this.saveTutorialDetail();
}
  }
async saveTutorialDetail(){
       const currentTutorial: Tutorial = {
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: (this.currentTutorial.published = true),
      };
      currentTutorial.categories = this.selectedCategories;
      await this.tutorialService.createTutorial(currentTutorial);
      this.router.navigate(['/tutorials']);
      console.log(currentTutorial);
    } 

    async  updatetutorial(){
      this.submitted = true
      if(this.registerForm.invalid){
      return
  }else{
       this.updateTutorialData();
  }
    } 
  async updateTutorialData() {
    const currentTutorial: Tutorial = {
      id: this.currentTutorial.id,
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: (this.currentTutorial.published = false),
    };
    currentTutorial.categories = this.selectedCategories;
    await this.tutorialService.update(currentTutorial);
    this.router.navigate(['/tutorials']);
    console.log(currentTutorial);
  }

  async deletebyid() {
       await this.tutorialService.deleteid(this.currentTutorial.id);
    
  }

  get fval() {
    return this.registerForm.controls;
    }
  
   async signup(){
    this.submitted = true;
    if (this.registerForm.invalid) {
    return;
    }
    alert('form fields are validated successfully!');
    }
   }
  




