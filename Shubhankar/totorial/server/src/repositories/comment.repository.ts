import {getManager, getRepository} from "typeorm";
import {Comment, Tutorials} from '../models'

export interface ICommentPayload {
  content: string;
  userId: number;
  postId: number;
  tutorialsId: number;
}

export const createComment  = async (payload: ICommentPayload) :Promise<Comment> => {
  const commentRepository = getRepository(Comment);
  const comment = new Comment()
  return commentRepository.save({
    ...comment,
    ...payload
  })
}

export const getComments  = async () :Promise<Array<Comment>> => {
  const commentRepository = getRepository(Comment);
  return commentRepository.find()
}
// export const getComment  = async (tutorialsId: number) :Promise<Comment | null> => {
//   const commentRepository = getRepository(Comment);
//   const comment = await commentRepository.findOne({tutorialsId: tutorialsId})
//   if (!comment) return null
//   return comment
// }

// export const getComment = async (tutorialId: number) => {
//   const entityManager = getManager();
//   const query = entityManager.createQueryBuilder(Comment, "comments");
//  // eslint-disable-next-line prefer-const
//   let comment = await query
//   .select(["comments", "tutorials"])
//   .leftJoinAndSelect("comments.tutorials", "tutorials" )
//   .where("comments.tutorial.id = tutorialId", { tutorials: tutorialId })
//  .getMany();
//   return comment;
//  };

export const getComment = async (tutorialsId: number) => {
  const entityManager = getManager();
  const query = entityManager.createQueryBuilder(Comment, "comments");
  let prod = await query
    .select(["comments", "tutorials"])
    .leftJoinAndSelect("comments.tutorials", "tutorials")
    .where("comments.tutorialsId = :tutorialsId", { tutorialsId: tutorialsId })
    .getMany();
  return prod;
};
