import { Get, Route, Tags, Post, Body, Path } from 'tsoa';

import { getManager } from 'typeorm';

import { Inject } from 'typescript-ioc';
import { Product } from './model/product';
import { IProductPayload, ProductRepository } from './product.repository';

@Route('products')
@Tags('product')
export class ProductController {
  [x: string]: any;
  @Inject
  private ProductRepository!: ProductRepository;

  @Get('/')
  public async getProducts(): Promise<Array<Product>> {
    console.log('dfsd');
    return this.ProductRepository.getProducts();
  }

  @Post('/')
  public async createProduct(@Body() body: IProductPayload): Promise<Product> {
    return this.ProductRepository.createProduct(body);
  }

  @Get('/:id')
  public async getProduct(@Path() id: any) {
    const prod = this.ProductRepository.getOneProduct(Number(id));
    return prod;
  }
}
