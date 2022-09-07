import { getManager, getRepository } from 'typeorm';
import { Tutorial } from '../models/tutorial';
import { Category } from '../models/category';
export interface ITutorialPayload {
  title: string;
  description: string;
  published?: boolean;
  timeZone?: string;
}
export const getTutorial = async (): Promise<Array<Tutorial>> => {
  const tutorialRepository = getRepository(Tutorial);
  return tutorialRepository.find();
};

export const createTutorial = async (
  payload: ITutorialPayload,
): Promise<Tutorial> => {
  const tutorialRepository = getRepository(Tutorial);
  const tutorial = new Tutorial();
  return tutorialRepository.save({
    ...tutorial,
    ...payload,
  });
};

// export const getTutorialByID = async (id: number): Promise<Tutorial | null> => {
//   const tutorialRepository = getRepository(Tutorial);
//   const tutorial = await tutorialRepository.findOne({ id: id });
//   if (!tutorial) return null;
//   return tutorial;
// };
export const getTutorialById = async (id: number) => {
  const entityManager = getManager();

  const query = entityManager.createQueryBuilder(Tutorial, 'tutorial');

  // eslint-disable-next-line prefer-const
  let tutorial = await query

    .select(['tutorial', 'categories'])

    .leftJoinAndSelect('tutorial.categories', 'categories')

    .where('tutorial.id = :id', { id: id })

    .getOne();

  return tutorial;
};

export const getTutorialDeleteByID = async (
  id: number,
): Promise<Tutorial | string> => {
  const tutorialRepository = getRepository(Tutorial);
  const tutorial = await tutorialRepository.delete({ id: id });
  if (tutorial) return 'deleted';
};
export const updateTutorial = async (
  payload: ITutorialPayload,
): Promise<Tutorial> => {
  const tutorialRepository = getRepository(Tutorial);

  const tutorial = new Tutorial();

  return tutorialRepository.save({
    ...tutorial,

    ...payload,
  });
};
