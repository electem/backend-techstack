import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user.service'
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user = {
    title: '',
    description: '',
  }
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  async saveUser() {
    const data = {
      title: this.user.title,
      description: this.user.description,
    }
    const res = await this.userService.create(data).toPromise()
    if (res) {
      this.router.navigate(['/userListing'])
    }
  }
}
