import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  T(val: any) {
    console.warn(val);
  }

  constructor() {}

  ngOnInit(): void {}
}
