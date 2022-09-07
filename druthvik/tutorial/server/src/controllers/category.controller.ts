import {
  getCategory,
  getCategoryByID,
  ICategoryPayload,
  createCategory,
} from '../repositories/category.repository';
import { Get, Route, Tags, Path, Post, Body } from 'tsoa';
import { Category } from '../models';

@Route('categories')
@Tags('Category')
export default class CategoryController {
  @Get('/')
  public async getCategory(): Promise<Array<Category>> {
    return getCategory();
  }

  @Get('/:id')
  public async getCategoryByID(@Path() id: string): Promise<Category | null> {
    return getCategoryByID(Number(id));
  }
  @Post('/')
  public async createCategory(
    @Body() body: ICategoryPayload,
  ): Promise<Category> {
    return createCategory(body);
  }
}
