 import { request, response } from "express";
import { id } from "inversify";
import { getConnection, getManager, getRepository } from "typeorm";
import { Tutorial } from "../models/tutorials";

export interface ITutorialPayload {
  name: string;
  description: string;
}

export const getTutorials = async (): Promise<Array<Tutorial>> => {
  const tutorialRepository = getRepository(Tutorial);
  return tutorialRepository.find();
};

//querybuilder to get all the tutorials with their categories
// export const getTutorials = async (): Promise<Array<Tutorial>> => {
//   const entityManager = getManager();
//   let categories = [];
//   const query = entityManager.createQueryBuilder(Tutorial, "tutorial");
//   categories = await query
//     .select(["tutorial", "categories"])
//     .leftJoinAndSelect("tutorial.categories", "categories")
//     .getMany();
//   return categories;
// };

export const createTutorial = async (
  payload: ITutorialPayload
): Promise<Tutorial> => {
  const tutorialRepository = getRepository(Tutorial);
  const tutorial = new Tutorial();
  return tutorialRepository.save({
    ...tutorial,
    ...payload,
  });
};

// export const getTutorial = async (id: number): Promise<Tutorial | null> => {
//   const tutorialRepository = getRepository(Tutorial);
//   const tutorial = await tutorialRepository.findOne({ id: id });
//   if (!tutorial) return null;
//   return tutorial;
// };

//querybuilder to get a single tutorial with their category
export const getTutorial = async (id: number) => {
  const entityManager = getManager();
  const query = entityManager.createQueryBuilder(Tutorial, "tutorial");
  let prod = await query
    .select(["tutorial", "categories"])
    .leftJoinAndSelect("tutorial.categories", "categories")
    .where("tutorial.id = :id", { id: id })
    .getOne();
  return prod;
  
};

export const updateTutorial = async (
  payload: ITutorialPayload
): Promise<Tutorial> => {
  const tutorialRepository = getRepository(Tutorial);
  const tutorial = new Tutorial();
  return tutorialRepository.save({
    ...tutorial,
    ...payload,
  });
};
export const deleteTutorial = async (id: number) => {
  //id = parseInt(request.params.id);
  const entityManager = getManager();
  const query = entityManager.createQueryBuilder(Tutorial, "tutorial");
  let prod = await query
    .delete()
    .from(Tutorial)
    .where("tutorial.id = :id", { id: id })
    .execute();
  return response.status(200).send(`User deleted with ID: ${id}`);
};
// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User deleted with ID: ${id}`)
//   })
// }
