import { Route, Tags,  Post, Body, Get, Path} from "tsoa";
import {Category} from '../models'
import { ICategoryPayload ,createCategory, getCategory, getCategorys } from "../repositories/category.repository";
//import { Request } from "express";
// import { Inject } from "typescript-ioc";


@Route("categorys")
@Tags("category")
export class CategoryController {
  // @Inject
  // private categoryRepository!: CategoryRepository;
  // service: any;
  

  @Post("/")
  public async createCategory(@Body() body: ICategoryPayload): Promise<Category> {
    return  createCategory(body)
  }
  @Get("/")
  public async getCategory (): Promise<Array<Category>> {
    return getCategory ()
  }
  @Get("/:id")
  public async getCategorys(@Path() id: string): Promise<Category | null> {
    return getCategorys(Number(id))
  }

}
