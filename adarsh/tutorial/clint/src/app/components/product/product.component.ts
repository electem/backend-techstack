import { Component, OnInit } from '@angular/core'
import { Tutorial } from 'src/app/models/tutorial.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product = {
    title: '',
    selectedcategory: '',
  }

  category = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ]

  constructor() {}

  ngOnInit(): void {}
  saveproduct(): void {
    const data = {
      title: this.product.title,
      selectedcategory: this.product.selectedcategory,
    }
  }
}
