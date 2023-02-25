import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherService } from 'src/app/services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getTestBed } from '@angular/core/testing';
@Component({
  selector: 'app-teacheredit',
  templateUrl: './teacheredit.component.html',
  styleUrls: ['./teacheredit.component.css'],
})
export class TeachereditComponent implements OnInit {
  @Input() teacher?: Teacher;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  submitted = false;
  currentTeacher: Teacher = {
    name: '',
    address: '',
    phonenumber: 0,
    email: '',
  };
  Teacher: [] = [];
  route: any;
  id: any;
  message = '';
  tutorialsRef!: AngularFireList<Teacher>;
  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.currentTeacher = { ...this.teacher };
    this.message = '';
  }
  updateTeacher(): void {
    const data = {
      name: this.currentTeacher.name,
      address: this.currentTeacher.address,
      phonenumber: this.currentTeacher.phonenumber,
      email: this.currentTeacher.email,
    };

    if (this.currentTeacher.key) {
      this.teacherService
        .updateTeacher(this.currentTeacher.key, data)
        .then(() => (this.message = 'The status was updated successfully!'))
        .catch((err: any) => console.log(err));
      this.submitted = true;
    }
  }
  deleteTeacher(id: string): void {
    if (id) {
      this.teacherService
        .deleteTeacher(id)
        .then(() => {
          this.message = 'The status was updated successfully!';
        })
        .catch((err) => console.log(err));
      this.refreshList.emit();
    }
  }
}
