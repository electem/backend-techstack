import { Get, Route, Tags,  Post, Body, Path, Query} from "tsoa";
import {Product, Resource} from '../models'
import { Req } from "@nestjs/common";
import { ProductRepository, IProductPayload } from "../repositories/product.repository";
//import { Request } from "express";
import { Inject } from "typescript-ioc";


@Route("products")
@Tags("Product")
export class ProductController {
  //constructor(private readonly productRepository : ProductRepository) {}
  //constructor(@inject(ProductRepository) private productRepository: ProductRepository){}
  @Inject
  private productRepository!: ProductRepository;
  service: any;
  @Get("/")
  public async getProducts(): Promise<Array<Product>> {
    return this.productRepository.getProducts()
  }

  @Post("/")
  public async createProduct(@Body() body: IProductPayload): Promise<Product> {
    return this.productRepository.createProduct(body)
  }

  // @Get("/:id")
  // public async getProduct(@Path() id: string): Promise<Product | null> {
  //   return getProduct(Number(id))
  // }

  @Get("/:id")
    async getProdProfile (@Path() id: any) {
          let prod =  await this.productRepository.findOne(Number(id));
          return prod;
      }
    
    // @Get("{/:id}")
    // public async getProdProfile(
    //   @Path() id: string,
    //   @Query() name?: string
    // ): Promise<Product> {
    //   return await this.productRepository.findOne(id).get(id);
    // }
}
