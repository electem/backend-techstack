import { Component, OnInit } from '@angular/core'
import { Course } from 'src/app/models/course.model'
import { CouserService } from 'src/app/services/cource.service'
@Component({
  selector: 'app-cource',
  templateUrl: './cource.component.html',
  styleUrls: ['./cource.component.css'],
})
export class CourceComponent implements OnInit {
  cource: Course = {
    xyz: '',
    abc: '',
  }
  constructor(private courceService: CouserService) {}

  ngOnInit(): void {}
  save() {
    const data = {
      name: this.cource.xyz,
      address: this.cource.abc,
    }
    console.log(data)
    this.courceService.save(data)
  }
}
