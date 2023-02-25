import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherService } from 'src/app/services/teacher.service';
@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css'],
})
export class ComponentComponent implements OnInit {
  genders?: string[];
  teacher: Teacher = new Teacher();
  submitted = false;
  constructor(private tutorialService: TeacherService) {}

  ngOnInit(): void {
    this.getGenders();
  }
  saveTeacher(): void {
    this.tutorialService.createTeacher(this.teacher).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newTeacher(): void {
    this.submitted = false;
    this.teacher = new Teacher();
  }
  getGenders() {
    this.genders = this.tutorialService.getGenders();
  }
}
