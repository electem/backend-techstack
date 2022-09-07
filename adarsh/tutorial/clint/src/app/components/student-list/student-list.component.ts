import { Component, OnInit } from '@angular/core'
import { StudentService } from 'src/app/services/student.service'
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: any = []
  currentStudent: any = {}

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.retriveStudents()
  }

  private async retriveStudents() {
    const data = await this.studentService.getAllStudentlist().toPromise()
    this.students = data
  }

  setActiveStudent(student: any) {
    this.currentStudent = student
  }
}
