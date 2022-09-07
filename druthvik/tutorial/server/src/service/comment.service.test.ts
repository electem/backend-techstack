import * as commentService from '../service/comment.service';
import { getRepository } from 'typeorm';

describe('CommentRepository', () => {
  describe('getComments', () => {
    test('should return empty array', async () => {
      const id = 89;
      const comments = await commentService.getTutorialComment(id);
      expect(comments).toEqual();
    });
  });
});
