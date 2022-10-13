import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Category } from "../models/category";
import {
  getCategorys,
  createCategory,
  ICategoryPayload,
  getCategory,
} from "../repositories/Category.repository";

@Route("categorys")
@Tags("category")
export default class CategoryController {
  @Get("/")
  public async getCategorys(): Promise<Array<Category>> {
    return getCategorys();
  }

  @Post("/")
  public async createCategory(
    @Body() body: ICategoryPayload
  ): Promise<Category> {
    return createCategory(body);
  }

  // @Get("/:id")
  // public async getCategory(@Path() id: string): Promise<Category | null> {
  //   return getCategory(Number(id));
  // }
  @Get("/:id")
  public async getCategory(@Path() id: string) {
    return getCategory(Number(id));
  }
}
