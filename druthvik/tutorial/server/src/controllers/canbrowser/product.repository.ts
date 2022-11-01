import { getRepository } from 'typeorm';

import { getManager, Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from './model/product';
import { urlextract } from './fileurl';
import { Resources } from './model/resource';

export interface IProductPayload {
  content: string;
}

@Injectable()
export class ProductRepository {
  constructor(private readonly connection: Connection) {}

  public createProduct = async (payload: IProductPayload): Promise<Product> => {
    const productRepository = getRepository(Product);
    const product = new Product();
    return productRepository.save({
      ...product,
      ...payload,
    });
  };

  public async getOneProduct(id: number) {
    const entityManager = getManager();
    const product = await entityManager
      .createQueryBuilder(Product, 'product')
      .leftJoinAndSelect('product.resource', 'resource')
      .where('product.id = :id', { id: id })
      .getMany();
    let productList: any = [];
    productList = product[0].resource;
    console.log('name is', product[0].name);
    const url = new urlextract(productList);
    url.copyUrl();
    return product;
  }
  //Find all products whose are associated with resource using query builder
  public getProducts = async (): Promise<Array<Product>> => {
    let productList = [];
    const entityManager = getManager();
    productList = await entityManager
      .createQueryBuilder(Product, 'product')
      .leftJoinAndSelect('product.resource', 'resource')
      .getMany();
    return productList;
  };
}
