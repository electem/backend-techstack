import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  title = ''
  selectedCar!: number

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ]
  constructor() {}

  ngOnInit(): void {}

  saveTest() {
    console.log(this.title)
    console.log(this.selectedCar)
  }
}
