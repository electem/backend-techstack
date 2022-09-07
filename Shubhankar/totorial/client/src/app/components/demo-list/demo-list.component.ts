import { Component, OnInit } from '@angular/core'
import { DemoListService } from 'src/app/services/demo-list.service'
@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.css'],
})
export class DemoListComponent implements OnInit {
  demos?: any = []
  currentdemos?: any = {}
  constructor(private DemoListService: DemoListService) {}

  ngOnInit(): void {
    this.retrivedemos()
  }
  retrivedemos() {
    this.DemoListService.getAlldemolist().subscribe(
      (data) => {
        this.demos = data
        console.log(data)
      },
      (error) => {
        console.log(error)
      },
    )
  }
  setActivedemos(demos: any) {
    this.currentdemos = demos
  }
}
