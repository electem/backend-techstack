import {createQueryBuilder, getRepository} from "typeorm";
import {Product, Resource} from '../models'
import { getManager, Connection } from "typeorm";
import { Injectable } from "@nestjs/common";

export interface IProductPayload {
  content: string;
  resid: number;
}

@Injectable()
export class ProductRepository {
constructor(private readonly connection: Connection) {}

 
//Fild all products using repository
// public getProducts  = async () :Promise<Array<Product>> => {
//   const productRepository = getRepository(Product);
//   return productRepository.find()
//   }

  //Find all products using query builder
  // public getProducts  = async () :Promise<Array<Product>> => {
  //     const entityManager = getManager();
  //     let product = [];
  //     product = await entityManager
  //       .createQueryBuilder()
  //       .select("product")
  //       .from(Product, "product")
  //       .getMany();
  //       console.log(product);

  //     return product;
  // }

  //Find all products whose are associated with resource using query builder
//   public getProducts  = async () :Promise<Array<Product>> => {
//     const entityManager = getManager();
//     let prod = [];
//     console.log("working fine");
//     let query = entityManager.createQueryBuilder(Product,'product');
//     prod = await query.innerJoinAndSelect('resource', 'r', 'product.resId = r.id').execute();
//    return prod;
// }

//Find all products whose are associated with resource using query builder
public getProducts  = async () :Promise<Array<Product>> => {
  let prod = [];
  const entityManager = getManager();
  prod = await entityManager.createQueryBuilder(Product,'product')
  .leftJoinAndSelect("product.resource", "resource").getMany();
  return prod;
}

public createProduct  = async (payload: IProductPayload) :Promise<Product> => {
  const productRepository = getRepository(Product);
  const product = new Product()
  return productRepository.save({
    ...product,
    ...payload
  })
}

// Working Code select product from repository
// export const getProduct  = async (id: number) :Promise<Product | null> => {
//   const productRepository = getRepository(Product);
//   const product = await productRepository.findOne({id: id})
//   if (!product) return null
//   return product
// }


//Query Code fro the selecrt product
// async findOne(id: number){
//   console. log("product id is ", id);
//   const entityManager = getManager();
//   const product = await entityManager
//     .createQueryBuilder()
//     .select("product")
//     .from(Product, "product")
//     .where("product.id = :id", { id: id })
//     .getOne();
//     console. log("product id is ", product);
//   return product;
// }

async findOne(id: number){
  const entityManager = getManager();
  const prod = await entityManager.createQueryBuilder(Product,'product')
  .leftJoinAndSelect("product.resource", "resource")
  .where("product.resId = :resId", { resId: id}).getMany();
  return prod;
}
}