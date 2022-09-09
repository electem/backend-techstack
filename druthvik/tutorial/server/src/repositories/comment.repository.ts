import PostController from 'src/controllers/post.controller';
import {
  ConnectionOptions,
  createConnection,
  getManager,
  getRepository,
} from 'typeorm';
import { Comment } from '../models';
import moment from 'moment';

export interface ICommentPayload {
  content: string;
  tutorialId: number;
  timeZone: string;
}

export const getComments = async (): Promise<Array<Comment>> => {
  const commentRepository = getRepository(Comment);
  return commentRepository.find();
};

export const createComment = async (
  payload: ICommentPayload,
): Promise<Comment> => {
  const commentRepository = getRepository(Comment);
  const comment = new Comment();
  return commentRepository.save({
    ...comment,
    ...payload,
  });
};

// export const getComment = async (id: number): Promise<Comment | null> => {
//   const commentRepository = getRepository(Comment);
//   const comment = await commentRepository.findOne({ id: id });
// };
export const getTutorialComment1 = async (tutorialId: number) => {
  const entityManager = getManager();
  const query = entityManager.createQueryBuilder(Comment, 'comments');
  const getComment = await query
    .select(['comments', 'tutorial'])
    .leftJoinAndSelect('comments.tutorial', 'tutorial')
    .where('comments.tutorialId = :tutorialId', { tutorialId: tutorialId })
    .getMany();
  console.log(getTutorialComment1);
  console.log(getComment);
  return getComment;
};

// export const getComment = async (id: number): Promise<Comment | null> => {
//   const commentRepository = getRepository(Comment);
//   const comment = await commentRepository.findOne({ id: id });
//   if (!comment) return null;
//   return comment;
// };
