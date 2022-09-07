import { Component, OnInit } from '@angular/core'
import { CouserService } from 'src/app/services/cource.service'
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-cource-details',
  templateUrl: './cource-details.component.html',
  styleUrls: ['./cource-details.component.css'],
})
export class CourceDetailsComponent implements OnInit {
  currentCource: any = {
    title: '',
    description: '',
    published: false,
  }
  message = ''

  constructor(
    private couserService: CouserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCource(this.route.snapshot.params.id)
  }
  getCource(id: string): void {
    this.couserService.get(id).subscribe(
      (data) => {
        this.currentCource = data
        console.log(data)
      },
      (error) => {
        console.log(error)
      },
    )
  }
  updateCource(): void {
    this.couserService
      .update(this.currentCource.id, this.currentCource)
      .subscribe(
        (response) => {
          console.log(response)
          this.router.navigate(['/cource-list'])
          this.message = response.message
            ? response.message
            : 'This Student was updated successfully!'
        },
        (error) => {
          console.log(error)
        },
      )
  }
  deleteCource(): void {
    this.couserService.delete(this.currentCource.id).subscribe(
      (response) => {
        console.log(response)
        this.router.navigate(['/cource-list'])
      },
      (error) => {
        console.log(error)
      },
    )
  }
}
