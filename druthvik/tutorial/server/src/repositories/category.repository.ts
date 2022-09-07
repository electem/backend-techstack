import { getManager, getRepository } from 'typeorm';
import { Category } from '../models/category';

export interface ICategoryPayload {
  title: string;
}

export const getCategory = async (): Promise<Array<Category>> => {
  const categoryRepository = getRepository(Category);
  return categoryRepository.find();
};

export const getCategoryByID = async (id: number): Promise<Category | null> => {
  const catgeoryRepository = getRepository(Category);
  const category = await catgeoryRepository.findOne({ id: id });
  if (!category) return null;
  return category;
};
export const createCategory = async (
  payload: ICategoryPayload,
): Promise<Category> => {
  const postCategory = getRepository(Category);
  const post = new Category();
  return postCategory.save({
    ...post,
    ...payload,
  });
};
