import { Component, OnInit } from '@angular/core'
import { StudentService } from 'src/app/services/student.service'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  student = {
    name: '',
    address: '',
  }
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {}

  save() {
    const data = {
      name: this.student.name,
      address: this.student.address,
    }
    console.log(data)
    this.studentService.save(data)
  }
}
