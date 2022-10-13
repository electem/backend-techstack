import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  registerForm!: FormGroup;
  submitted!: boolean;
  currentProduct: Product = {
    name: '',
    type: '',
  };

  constructor(
    private panelService: PanelService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.getProduct();
  }

  get validation() {
    return this.registerForm.controls;
  }

  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
  }

  async getProduct() {
    this.currentProduct = await this.panelService.getProduct();
  }

  async saveProduct(): Promise<void> {
    const productData: Product = {
      id: this.currentProduct.id,
      name: this.currentProduct.name,
      type: this.currentProduct.type,
      amount: this.currentProduct.amount,
    };
    await this.panelService.createProduct(productData);
  }
}
