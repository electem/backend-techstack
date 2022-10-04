import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  message: string | undefined;
  route: any;
  tutorialService: any;
  currentTutorial: any;

  constructor() { }

  ngOnInit(): void {
    this.message = ''
    this.getTutorial(this.route.snapshot.params.id)
  }

  private async getTutorial(id: string) {
    const data = await this.tutorialService.get(id);
    this.currentTutorial = data
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status,
    }

    this.message = ''

    this.tutorialService.update(this.currentTutorial.id, data).subscribe(
      (response: { message: string; }) => {
        this.currentTutorial.published = status
        console.log(response)
        this.message = response.message
          ? response.message
          : 'The status was updated successfully!'
      },
      (error: any) => {
        console.log(error)
      },
    )
  }

  updateTutorial(): void {
    this.message = ''

    this.tutorialService
      .update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        (response: { message: string; }) => {
          console.log(response)
          this.message = response.message
            ? response.message
            : 'This tutorial was updated successfully!'
        },
        (error: any) => {
          console.log(error)
        },
      )
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe(
      (response: any) => {
        console.log(response)
        this.route.navigate(['/tutorials'])
      },
      (error: any) => {
        console.log(error)
      },
    )
  }

}
