import { Component, OnInit } from '@angular/core'
import { StudentService } from 'src/app/services/student.service'
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  currentStudent: any = {
    title: '',
    description: '',
    published: false,
  }
  message = ''
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getStudent(this.route.snapshot.params.id)
  }

  private async getStudent(id: string) {
    const data = await this.studentService.get(id).toPromise()
    this.currentStudent = data
  }

  public async updateStudent() {
    const data = await this.studentService
      .update(this.currentStudent.id, this.currentStudent)
      .toPromise()
    if (data) {
      this.router.navigate(['/student-list'])
      this.message = data.message
        ? data.message
        : 'This Student was updated successfully!'
    }
  }

  public async deleteStudent() {
    const data = await this.studentService
      .delete(this.currentStudent.id)
      .toPromise()
    if (data) {
      this.router.navigate(['/student-list'])
    }
  }
}
