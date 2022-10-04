import { Component, OnInit } from '@angular/core'
import { CouserService } from 'src/app/services/cource.service'
@Component({
  selector: 'app-cource-list',
  templateUrl: './cource-list.component.html',
  styleUrls: ['./cource-list.component.css'],
})
export class CourceListComponent implements OnInit {
  cources: any = []
  currentCources: any = {}
  constructor(private couserService: CouserService) {}

  ngOnInit(): void {
    this.retrivecources()
  }
  retrivecources() {
    this.couserService.getAllCourcelist().subscribe(
      (data) => {
        this.cources = data
        console.log(data)
      },
      (error) => {
        console.log(error)
      },
    )
  }
  setActiveCource(cource: any) {
    this.currentCources = cource
  }
}
