import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private gender: string[] = ['Male', 'Female'];
  private basePath: string = '/teachers';
  private dbPath = '/teachers';
  item?: AngularFireList<Teacher>;
  tutorialsRef: AngularFireList<Teacher>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }
  getGenders() {
    return this.gender;
  }

  getAllTeachers(): AngularFireList<Teacher> {
    return this.tutorialsRef;
  }

  createTeacher(tutorial: Teacher): any {
    return this.tutorialsRef.push(tutorial);
  }

  updateTeacher(key: string, value: any): Promise<void> {
    return this.tutorialsRef.update(key, value);
  }

  deleteTeacher(key: string): Promise<void> {
    return this.tutorialsRef.remove(key);
  }

  deleteAllTeachers(): Promise<void> {
    return this.tutorialsRef.remove();
  }
}
