import { getManager, getRepository } from "typeorm";
import { Comment } from "../models";

export interface ICommentPayload {
  content: string;
  tutorialId: number;
}

// export const getComments  = async () :Promise<Array<Comment>> => {
//   const commentRepository = getRepository(Comment);
//   return commentRepository.find()
// }

export const getComments = async (): Promise<Array<Comment>> => {
  const entityManager = getManager();
  let tutorial = [];
  const query = entityManager.createQueryBuilder(Comment, "comments");
  tutorial = await query
    .select(["comments", "tutorial"])
    .leftJoinAndSelect("comments.tutorial", "tutorial")
    .getMany();
  return tutorial;
};

export const createComment = async (
  payload: ICommentPayload
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
//   if (!comment) return null;
//   return comment;
// };
export const getComment = async (tutorialId: number) => {
  const entityManager = getManager();
  const query = entityManager.createQueryBuilder(Comment, "comments");
  let prod = await query
    .select(["comments", "tutorial"])
    .leftJoinAndSelect("comments.tutorial", "tutorial")
    .where("comments.tutorialId = :tutorialId", { tutorialId: tutorialId })
    .getMany();
  return prod;
};
