import { getManager, getRepository } from 'typeorm';
import { Comment } from '../models';
import moment from 'moment';

let timezone: string;
export const getTutorialComment1 = async (
  tutorialId: number,
  timeZone: string,
) => {
  const entityManager = getManager();
  timezone = timeZone;
  const query = entityManager.createQueryBuilder(Comment, 'comments');
  const comments = await query
    .select(['comments'])
    .where('comments.tutorialId = :tutorialId', { tutorialId: tutorialId })
    .getMany();
  //comments.map(convert);
  return comments;
};

function convert(comment: Comment): Comment {
  const commentConverted: Comment = comment;
  commentConverted.createdAtStr = moment
    .utc(comment.createdAt)
    .utcOffset(timezone, true)
    .toLocaleString();
  return comment;
}
