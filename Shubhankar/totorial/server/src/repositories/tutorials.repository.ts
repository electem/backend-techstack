import { getManager, getRepository } from "typeorm";
import { Tutorials } from '../models'

export interface ITutorialsrPayload {
  title: string;
  description: string;



}
export const createTutorial = async (payload: ITutorialsrPayload): Promise<Tutorials> => {
  const tutorialsRepository = getRepository(Tutorials);
  const tutorials = new Tutorials()
  return tutorialsRepository.save({
    ...tutorials,
    ...payload
  })
}


export const getTutorials = async (): Promise<Array<Tutorials>> => {
  const entityManager = getManager();
  let categories = [];
  const query = entityManager.createQueryBuilder(Tutorials, "tutorials");
  categories = await query
    .select(["tutorials", "categories"])
    .leftJoinAndSelect("tutorials.categories", "categories")
    .getMany();
  return categories;
};

export const getTutorial = async (id: number) => {
 const entityManager = getManager();
 const query = entityManager.createQueryBuilder(Tutorials, 'tutorial');
// eslint-disable-next-line prefer-const
 let tutorial = await query
.select(['tutorial', 'categories'])
.leftJoinAndSelect('tutorial.categories', 'categories')
.where('tutorial.id = :id', { id: id })
.getMany();
 return tutorial;
};



export const updateTutorial = async (payload: ITutorialsrPayload): Promise<Tutorials> => {
  const tutorialsRepository = getRepository(Tutorials);
  const tutorials = new Tutorials()
  return tutorialsRepository.save({
    ...tutorials,
    ...payload
  })
}

// export const updateTutorial  = async (id: number) => {
//   const tutorialsRepository = getRepository(Tutorials);
//   const tutorials = new Tutorials()
//   return tutorialsRepository.save({tutorials})
// }




