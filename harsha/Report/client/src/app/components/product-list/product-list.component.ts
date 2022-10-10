import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.getProductsList();
  }

  async getProductsList() {
    this.products = await this.panelService.getProductsList();
  }
}
