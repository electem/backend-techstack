import { getManager } from 'typeorm';
import { Comment } from '../models';
import moment from 'moment';

export const getTutorialComment = async (tutorialId: number) => {
  const entityManager = getManager();
  const query = entityManager.createQueryBuilder(Comment, 'comments');
  const getComment = await query
    .select(['comments', 'tutorial'])
    .leftJoinAndSelect('comments.tutorial', 'tutorial')
    .where('comments.tutorialId = :tutorialId', { tutorialId: tutorialId })
    .getMany();
  getComment.map((a) => {
    a.content = moment.utc(a.createdAt, a.tutorial.timeZone).toString();
  });
  return getComment;
};
