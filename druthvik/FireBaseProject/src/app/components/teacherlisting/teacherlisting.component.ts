import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherService } from 'src/app/services/teacher.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-teacherlisting',
  templateUrl: './teacherlisting.component.html',
  styleUrls: ['./teacherlisting.component.css'],
})
export class TeacherlistingComponent implements OnInit {
  teachers: Teacher[] = [];
  teacher?:Teacher[];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.retrieveTeachers();
  }

  retrieveTeachers(): void {
    this.teacherService
      .getAllTeachers()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() })),
        ),
      )
      .subscribe((data) => {
        this.teachers = data;
        this.teacher = data;
      });
  }
  deleteTeacher(id: string): void {
    if (id) {
      this.teacherService
        .deleteTeacher(id)
        .then(() => {})
        .catch((err) => console.log(err));
    }
  }
}
