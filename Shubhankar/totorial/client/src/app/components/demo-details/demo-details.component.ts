import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DemoListService } from 'src/app/services/demo-list.service'
@Component({
  selector: 'app-demo-details',
  templateUrl: './demo-details.component.html',
  styleUrls: ['./demo-details.component.css'],
})
export class DemoDetailsComponent implements OnInit {
  currentdemos: any = {
    title: '',
    description: '',
    published: false,
  }

  constructor(
    private demoListService: DemoListService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getdemo(this.route.snapshot.params.id)
  }
  getdemo(id: string): void {
    this.demoListService.get(id).subscribe(
      (data) => {
        this.currentdemos = data
        console.log(data)
      },
      (error) => {
        console.log(error)
      },
    )
  }
}
