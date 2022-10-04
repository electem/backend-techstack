import {getRepository} from "typeorm";
import {Category} from '../models'

export interface ICategoryPayload {
  title: string;
  tutorialId: number;
}

// @Injectable()
// export class CategoryRepository {
// constructor(private readonly connection: Connection) {}

export const createCategory  = async (payload: ICategoryPayload) :Promise<Category> => {
  const categoryRepository = getRepository(Category);
  const category = new Category()
  return categoryRepository.save({
    ...category,
    ...payload
  })
}
export const getCategory  = async () :Promise<Array<Category>> => {
  const postRepository = getRepository(Category);
  return postRepository.find()
}


export const getCategorys  = async (id: number) :Promise<Category | null> => {
  const postRepository = getRepository(Category);
  const post = await postRepository.findOne({id: id})
  if (!post) return null
  return post
}

