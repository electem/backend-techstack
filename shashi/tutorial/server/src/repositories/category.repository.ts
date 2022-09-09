import { Tutorial } from "../models/tutorials";
import { getManager, getRepository } from "typeorm";
import { Category } from "../models/category";

export interface ICategoryPayload {
  title: string;
}

export const getCategorys = async (): Promise<Array<Category>> => {
  const categoryRepository = getRepository(Category);
  return categoryRepository.find();
};

// export const getCategorys = async (): Promise<Array<Category>> => {
//   const entityManager = getManager();
//   let categories = [];
//   const query = entityManager.createQueryBuilder(Category, "category");
//   categories = await query
//     .select(["category", "tutorials"])
//     .leftJoinAndSelect("category.tutorials", "tutorials")
//     .getMany();
//   return categories;
// };

export const createCategory = async (
  payload: ICategoryPayload
): Promise<Category> => {
  const categoryRepository = getRepository(Category);
  const category = new Category();
  return categoryRepository.save({
    ...payload,
    ...category,
  });
};

export const getCategory = async (id: number): Promise<Category | null> => {
  const categoryRepository = getRepository(Category);
  const category = await categoryRepository.findOne({ id: id });
  if (!category) return null;
  return category;
};

// export const getCategory = async (id: number) => {
//   const entityManager = getManager();
//   let prod = [];
//   const query = entityManager.createQueryBuilder(Category, "category");
//   prod = await query
//     .select(["category", "tutorials"])
//     .leftJoinAndSelect("category.tutorials", "tutorials")
//     .where("category.id = :id", { id: id })
//     .getMany();
//   return prod;
// };
